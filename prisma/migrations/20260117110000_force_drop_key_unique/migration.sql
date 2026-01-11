-- Drop any residual unique constraint/index on key alone
DO $$
DECLARE
  cons RECORD;
BEGIN
  FOR cons IN
    SELECT conname
    FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE t.relname = 'Section'
      AND n.nspname = 'public'
      AND c.contype = 'u'
      AND c.conkey = ARRAY[ (
        SELECT attnum FROM pg_attribute
        WHERE attrelid = t.oid AND attname = 'key'
      ) ]
  LOOP
    EXECUTE format('ALTER TABLE "Section" DROP CONSTRAINT %I', cons.conname);
  END LOOP;
END $$;

DROP INDEX IF EXISTS "Section_key_key";
DROP INDEX IF EXISTS "section_key_unique_idx";

-- Ensure composite unique exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'Section' AND c.conname = 'Section_key_locale_key'
  ) THEN
    ALTER TABLE "Section" ADD CONSTRAINT "Section_key_locale_key" UNIQUE ("key", "locale");
  END IF;
END $$;
