-- Add index to support querying krawls by creator sorted by created_at desc
CREATE INDEX IF NOT EXISTS idx_krawls_creator_created_at
ON krawls (creator_id, created_at DESC);


