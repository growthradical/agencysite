# SEO Architecture Intelligence Tool: Implementation Blueprint (v1)

This document provides a concrete starter package for implementation:
1. Exact database schema (PostgreSQL).
2. Scoring rubric for prioritization.
3. v1 API contract for `/analyze`, `/architecture`, and `/tasks`.

> **Mode in this version:** no external API integrations. Input comes from user-uploaded keyword files and sitemap(s).

---

## 1) Database schema (PostgreSQL)

```sql
-- Enable UUID generation (Postgres 13+)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===== Core project setup =====
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  country_code CHAR(2) NOT NULL,
  language_code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(domain, country_code, language_code)
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  business_weight NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('country','state','city','district')),
  geo_weight NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ===== Input ingestion (manual uploads first) =====
CREATE TABLE project_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  input_type TEXT NOT NULL CHECK (input_type IN ('keyword_file','sitemap_file','sitemap_url')),
  file_name TEXT,
  storage_uri TEXT,
  source_label TEXT NOT NULL DEFAULT 'manual_upload',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ===== Keyword acquisition =====
CREATE TABLE keyword_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  source_name TEXT NOT NULL, -- e.g., manual_upload, future_google_ads, future_seo_provider
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  term TEXT NOT NULL,
  normalized_term TEXT NOT NULL,
  locale TEXT NOT NULL,
  search_volume INT,
  keyword_difficulty NUMERIC(5,2),
  cpc NUMERIC(10,2),
  intent TEXT CHECK (intent IN ('transactional','commercial','informational','navigational','mixed')),
  source_id UUID REFERENCES keyword_sources(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, normalized_term, locale)
);

CREATE TABLE keyword_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dominant_intent TEXT CHECK (dominant_intent IN ('transactional','commercial','informational','navigational','mixed')),
  total_volume INT NOT NULL DEFAULT 0,
  confidence NUMERIC(4,3) NOT NULL DEFAULT 0.500,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE keyword_cluster_members (
  cluster_id UUID NOT NULL REFERENCES keyword_clusters(id) ON DELETE CASCADE,
  keyword_id UUID NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  similarity_score NUMERIC(4,3),
  PRIMARY KEY(cluster_id, keyword_id)
);

-- ===== Existing website crawl =====
CREATE TABLE crawls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  crawl_status TEXT NOT NULL CHECK (crawl_status IN ('queued','running','completed','failed')),
  seed_url TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  crawl_id UUID REFERENCES crawls(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  path TEXT NOT NULL,
  status_code INT,
  title TEXT,
  h1 TEXT,
  canonical_url TEXT,
  robots_indexable BOOLEAN,
  word_count INT,
  content_hash TEXT,
  depth INT,
  is_orphan BOOLEAN,
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, url)
);

CREATE TABLE url_links (
  from_url_id UUID NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  to_url_id UUID NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  anchor_text TEXT,
  is_nofollow BOOLEAN,
  PRIMARY KEY(from_url_id, to_url_id, anchor_text)
);

-- ===== Ideal architecture =====
CREATE TABLE ideal_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL CHECK (page_type IN ('service','location','service_location','cluster_hub','supporting_article','other')),
  slug TEXT NOT NULL,
  title_suggestion TEXT,
  target_intent TEXT CHECK (target_intent IN ('transactional','commercial','informational','navigational','mixed')),
  parent_ideal_page_id UUID REFERENCES ideal_pages(id) ON DELETE SET NULL,
  priority_score NUMERIC(6,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, slug)
);

CREATE TABLE ideal_page_cluster_targets (
  ideal_page_id UUID NOT NULL REFERENCES ideal_pages(id) ON DELETE CASCADE,
  cluster_id UUID NOT NULL REFERENCES keyword_clusters(id) ON DELETE CASCADE,
  target_rank_range TEXT,
  PRIMARY KEY(ideal_page_id, cluster_id)
);

CREATE TABLE ideal_internal_links (
  from_ideal_page_id UUID NOT NULL REFERENCES ideal_pages(id) ON DELETE CASCADE,
  to_ideal_page_id UUID NOT NULL REFERENCES ideal_pages(id) ON DELETE CASCADE,
  link_reason TEXT,
  PRIMARY KEY(from_ideal_page_id, to_ideal_page_id)
);

-- ===== Gap analysis and execution =====
CREATE TABLE gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  gap_type TEXT NOT NULL CHECK (gap_type IN (
    'missing_page','cannibalization','intent_mismatch','thin_content',
    'orphan_page','internal_link_gap','indexability_issue','canonical_issue','duplicate_content'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  confidence NUMERIC(4,3) NOT NULL DEFAULT 0.500,
  actual_url_id UUID REFERENCES urls(id) ON DELETE SET NULL,
  ideal_page_id UUID REFERENCES ideal_pages(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  gap_id UUID REFERENCES gaps(id) ON DELETE SET NULL,
  team TEXT NOT NULL CHECK (team IN ('dev','content','design')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  acceptance_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
  priority_score NUMERIC(6,2) NOT NULL DEFAULT 0,
  effort_points INT NOT NULL DEFAULT 3,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','blocked','done')),
  owner TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ===== Helpful indexes =====
CREATE INDEX idx_keywords_project_intent ON keywords(project_id, intent);
CREATE INDEX idx_keyword_clusters_project ON keyword_clusters(project_id);
CREATE INDEX idx_urls_project_path ON urls(project_id, path);
CREATE INDEX idx_urls_project_indexable ON urls(project_id, robots_indexable);
CREATE INDEX idx_ideal_pages_project_type ON ideal_pages(project_id, page_type);
CREATE INDEX idx_gaps_project_type_severity ON gaps(project_id, gap_type, severity);
CREATE INDEX idx_tasks_project_team_status ON tasks(project_id, team, status);
```


### Canonical mapping table (what your team works from)

The core deliverable is a flat table view that merges current URL structure with ideal architecture and keyword clusters.

**Required columns**
- `existing_url`
- `ideal_url`
- `main_keyword`
- `related_keywords` (array or pipe-delimited text)
- `cluster_volume`

**Recommended extra columns (from your notes)**
- `main_cluster`
- `secondary_cluster`
- `tertiary_cluster`
- `cluster_id_1`, `cluster_id_2`, `cluster_id_3` (optionally up to `cluster_id_5`)
- `page_type` (`service`, `location`, `service_location`, `blog`, `other`)
- `action` (`keep`, `merge`, `create`, `redirect`, `retarget`)

### Manual clustering and URL unification rules (v1)

1. **Keyword normalization**
   - Lowercase, trim, remove punctuation, collapse spaces.
   - Generate token set and stemmed token set.
2. **Duplicate keyword removal**
   - If normalized tokens are identical, keep the highest-volume variant as canonical.
   - Keep discarded variants in `related_keywords`.
3. **Main / secondary / tertiary cluster assignment**
   - `main_cluster`: core topic noun (e.g., `apple cider`).
   - `secondary_cluster`: intent or modifier class (e.g., `recipe`, `brand`, `service`, `review`).
   - `tertiary_cluster`: geo or special qualifier (e.g., `jamaican`, `miami`, `quick`).
4. **URL unification (existing URLs)**
   - If multiple URLs target same main keyword and same page type, choose one canonical target URL.
   - Mark others as `merge` or `redirect` in output table.
5. **Ideal URL pattern generation**
   - Service: `/services/{main-keyword-slug}`
   - Location: `/locations/{location-slug}`
   - Service-location: `/locations/{location-slug}/{service-slug}`
   - Blog/support: `/blog/{topic-slug}`

**SQL view (example)**
```sql
CREATE OR REPLACE VIEW v_url_keyword_mapping AS
SELECT
  u.url AS existing_url,
  concat('https://', p.domain, ip.slug) AS ideal_url,
  k.term AS main_keyword,
  (
    SELECT string_agg(k2.term, ' | ' ORDER BY k2.search_volume DESC NULLS LAST)
    FROM keyword_cluster_members kcm2
    JOIN keywords k2 ON k2.id = kcm2.keyword_id
    WHERE kcm2.cluster_id = kcm.cluster_id
      AND k2.id <> k.id
    LIMIT 10
  ) AS related_keywords,
  kc.total_volume AS cluster_volume,
  kc.name AS main_cluster,
  NULL::text AS secondary_cluster,
  NULL::text AS tertiary_cluster,
  left(kc.id::text, 8) AS cluster_id_1,
  NULL::text AS cluster_id_2,
  NULL::text AS cluster_id_3,
  ip.page_type,
  CASE
    WHEN u.id IS NULL THEN 'create'
    WHEN ip.slug <> u.path THEN 'retarget'
    ELSE 'keep'
  END AS action
FROM ideal_pages ip
JOIN projects p ON p.id = ip.project_id
LEFT JOIN ideal_page_cluster_targets ipct ON ipct.ideal_page_id = ip.id
LEFT JOIN keyword_clusters kc ON kc.id = ipct.cluster_id
LEFT JOIN keyword_cluster_members kcm ON kcm.cluster_id = kc.id AND kcm.is_primary = true
LEFT JOIN keywords k ON k.id = kcm.keyword_id
LEFT JOIN urls u ON u.project_id = ip.project_id AND u.path = ip.slug;
```

---

## 2) Scoring rubric (priority engine)

Use a transparent scoring model for each detected gap/task:

```text
priority_score = ((traffic_potential * business_relevance * confidence) / effort) * severity_multiplier
```

### Inputs
- **traffic_potential (1–10)**
  - Derived from target cluster total volume, intent quality, and estimated click potential.
- **business_relevance (1–5)**
  - Derived from service weight, location weight, and strategic flags.
- **confidence (0.3–1.0)**
  - Confidence in diagnosis (strong crawl evidence + keyword/cluster confidence).
- **effort (1, 2, 3, 5, 8, 13)**
  - Story-point-like estimate by team-specific templates.
- **severity_multiplier**
  - `low=0.8`, `medium=1.0`, `high=1.2`, `critical=1.5`.

### Team-specific effort guidance
- **Dev**
  - 1: metadata/canonical fix on one template
  - 3: internal linking block change
  - 8: crawl/indexation architecture refactor
- **Content**
  - 2: refresh existing page with brief
  - 5: new service/location page from brief
  - 8: full cluster rollout (hub + supporting)
- **Design**
  - 1: CTA/layout tweak
  - 3: template component additions
  - 8: page-system redesign for multiple templates

### Priority bands
- **P0 (>= 35)**: execute this sprint.
- **P1 (20–34.99)**: next sprint.
- **P2 (10–19.99)**: backlog (planned).
- **P3 (< 10)**: parked / monitor.

---

## 3) v1 API contract

Base URL: `/api/v1`

Authentication: `Authorization: Bearer <token>` (implementation choice).

Response envelope:

```json
{
  "data": {},
  "meta": {
    "request_id": "uuid",
    "timestamp": "2026-01-01T12:00:00Z"
  },
  "error": null
}
```

### A) `POST /analyze`
Creates a full analysis run (uploaded keyword parsing, sitemap ingestion, clustering, structure compare, gap generation).

#### Request
```json
{
  "project": {
    "name": "Acme Plumbing",
    "domain": "acmeplumbing.com",
    "country_code": "US",
    "language_code": "en"
  },
  "services": ["water heater repair", "drain cleaning"],
  "locations": ["Austin", "Round Rock"],
  "inputs": {
    "keyword_file_uri": "s3://uploads/project-123/keywords.csv",
    "keyword_file_format": "csv",
    "sitemap": {
      "mode": "url",
      "value": "https://acmeplumbing.com/sitemap.xml"
    }
  },
  "assumptions": {
    "volume_column": "search_volume",
    "difficulty_column": "keyword_difficulty",
    "intent_column": "intent"
  }
}
```

#### Response (202 Accepted)
```json
{
  "data": {
    "project_id": "uuid",
    "analysis_id": "uuid",
    "status": "queued",
    "status_url": "/api/v1/analyze/{analysis_id}"
  },
  "meta": { "request_id": "uuid", "timestamp": "..." },
  "error": null
}
```

#### Status endpoint
`GET /analyze/{analysis_id}`

Returns job state: `queued | running | completed | failed` and stage-level progress.

#### Validation rules for manual mode
- Accept keyword files in CSV or XLSX.
- Required keyword columns: `keyword` (or mapped alias).
- Optional columns: `search_volume`, `keyword_difficulty`, `cpc`, `intent`, `service`, `location`.
- Accept sitemap as uploaded XML file or public URL.
- If volume/difficulty columns are missing, system still runs with reduced confidence.

---

### B) `GET /architecture`
Returns ideal site architecture and mapping to existing URLs.

#### Query params
- `project_id` (required)
- `analysis_id` (optional; defaults latest completed)
- `include_links=true|false` (default true)
- `view=tree|table` (default `table` for operations teams)

#### Response (200)
```json
{
  "data": {
    "project_id": "uuid",
    "analysis_id": "uuid",
    "summary": {
      "ideal_pages": 128,
      "existing_mapped": 73,
      "missing_pages": 55
    },
    "mapping_table": [
      {
        "existing_url": "https://acmeplumbing.com/water-heater-austin",
        "ideal_url": "https://acmeplumbing.com/water-heater-repair-austin",
        "main_keyword": "water heater repair austin",
        "related_keywords": ["hot water heater repair austin", "emergency water heater repair austin"],
        "cluster_volume": 1900,
        "main_cluster": "water heater repair",
        "secondary_cluster": "repair",
        "tertiary_cluster": "austin",
        "cluster_id_1": "1",
        "cluster_id_2": "4",
        "cluster_id_3": "1",
        "page_type": "service_location",
        "action": "retarget"
      }
    ],
    "pages": [
      {
        "ideal_page_id": "uuid",
        "page_type": "service_location",
        "slug": "/water-heater-repair-austin",
        "target_intent": "transactional",
        "cluster_ids": ["uuid"],
        "mapped_url": "https://acmeplumbing.com/water-heater-austin",
        "mapping_confidence": 0.87,
        "priority_score": 31.4,
        "parent_ideal_page_id": "uuid"
      }
    ],
    "internal_links": [
      {
        "from_ideal_page_id": "uuid",
        "to_ideal_page_id": "uuid",
        "reason": "cluster_support"
      }
    ]
  },
  "meta": { "request_id": "uuid", "timestamp": "..." },
  "error": null
}
```

---


### C) `GET /tasks`
Returns execution tasks for dev/content/design.

#### Query params
- `project_id` (required)
- `analysis_id` (optional)
- `team=dev|content|design` (optional)
- `status=todo|in_progress|blocked|done` (optional)
- `min_priority` (optional number)
- `limit`, `cursor` for pagination

#### Response (200)
```json
{
  "data": {
    "project_id": "uuid",
    "analysis_id": "uuid",
    "items": [
      {
        "task_id": "uuid",
        "team": "content",
        "title": "Create /water-heater-repair-austin",
        "description": "Missing high-intent service-location page mapped to cluster X.",
        "gap_type": "missing_page",
        "severity": "high",
        "priority_score": 36.8,
        "effort_points": 5,
        "acceptance_criteria": [
          "Primary keyword in title/H1",
          "Include local proof section",
          "Add schema: LocalBusiness + FAQ"
        ],
        "status": "todo"
      }
    ],
    "next_cursor": "opaque"
  },
  "meta": { "request_id": "uuid", "timestamp": "..." },
  "error": null
}
```


### D) `GET /mapping-table`
Returns the flat operations table for SEO architecture execution (the one you asked for).

#### Query params
- `project_id` (required)
- `analysis_id` (optional)
- `format=json|csv` (default `json`)
- `action=keep|merge|create|redirect|retarget` (optional filter)
- `page_type=service|location|service_location|blog|other` (optional)

#### Response (200)
```json
{
  "data": {
    "project_id": "uuid",
    "analysis_id": "uuid",
    "columns": [
      "existing_url",
      "ideal_url",
      "main_keyword",
      "related_keywords",
      "cluster_volume"
    ],
    "rows": [
      {
        "existing_url": "https://acmeplumbing.com/water-heater-austin",
        "ideal_url": "https://acmeplumbing.com/water-heater-repair-austin",
        "main_keyword": "water heater repair austin",
        "related_keywords": ["hot water heater repair austin", "emergency water heater repair austin"],
        "cluster_volume": 1900
      }
    ]
  },
  "meta": { "request_id": "uuid", "timestamp": "..." },
  "error": null
}
```


---

## Suggested immediate implementation sequence

1. Create migrations for all tables above, including `project_inputs`.
2. Implement file intake + validation (CSV/XLSX keywords, XML sitemap).
3. Implement `POST /analyze` as async orchestration only (no heavy logic in request path).
4. Parse sitemap URLs into `urls` baseline and parse keyword rows into `keywords`.
5. Add deterministic clustering (lexical + URL pattern alignment), then generate `ideal_pages` + `gaps` + `tasks`.
6. Expose `GET /architecture` and `GET /tasks` with pagination and filters.
7. Add observability: run logs, per-stage timings, rejected rows, and failure reasons.

## What to do next (immediate, no external APIs)

1. **Prepare your keyword document template**
   - Minimum column: `keyword`
   - Recommended columns: `search_volume`, `intent`, `service`, `location`, `keyword_difficulty`, `cpc`
2. **Upload sitemap and keyword file to the project**
   - Use `POST /analyze` with `inputs.keyword_file_uri` and sitemap URL/file.
3. **Run the first analysis and inspect quality flags**
   - Check parsing stats (accepted vs rejected rows).
   - Review clusters with low confidence for manual merge/split.
4. **Generate execution backlog**
   - Filter `/tasks` by team and `min_priority`.
   - Start with P0/P1 missing pages + indexability issues.
5. **Tighten iteration loop**
   - Update file column mappings once.
   - Re-run analysis weekly after adding/editing pages.

This gives a deployable v1 with explainable recommendations before adding advanced ML.
