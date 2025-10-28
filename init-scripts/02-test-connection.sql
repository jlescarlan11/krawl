-- Test script to verify PostGIS installation and database setup
-- This script runs automatically during container initialization

-- Test 1: Verify PostGIS extension is installed
DO $$
BEGIN
    RAISE NOTICE 'Testing PostGIS installation...';
    PERFORM PostGIS_version();
    RAISE NOTICE 'PostGIS extension is installed successfully!';
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'PostGIS extension test failed: %', SQLERRM;
END $$;

-- Test 2: Create a sample spatial table to verify functionality
CREATE TABLE IF NOT EXISTS test_locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location GEOMETRY(Point, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test 3: Insert a sample location (San Francisco coordinates)
INSERT INTO test_locations (name, location) 
VALUES ('Test Location', ST_SetSRID(ST_MakePoint(-122.4194, 37.7749), 4326))
ON CONFLICT DO NOTHING;

-- Test 4: Query to verify spatial functionality
DO $$
DECLARE
    test_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO test_count FROM test_locations;
    RAISE NOTICE 'Test locations table created with % record(s)', test_count;
END $$;

-- Display PostGIS version info
SELECT PostGIS_version() as postgis_version;

