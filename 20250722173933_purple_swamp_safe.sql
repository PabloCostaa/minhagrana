/*
  # Adicionar tabela resource_permissions

  1. Nova Tabela
    - `resource_permissions`
      - `id` (serial, primary key)
      - `module` (text)
      - `permission` (text)

  2. Segurança
    - Enable RLS na tabela `resource_permissions`
    - Adicionar políticas para super admins gerenciarem permissões
*/

CREATE TABLE IF NOT EXISTS public.resource_permissions (
  id SERIAL PRIMARY KEY,
  module TEXT,
  permission TEXT
);

ALTER TABLE public.resource_permissions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Super admins can manage resource permissions'
      AND tablename = 'resource_permissions'
  ) THEN
    CREATE POLICY "Super admins can manage resource permissions"
    ON public.resource_permissions
    FOR ALL
    USING (is_super_admin(auth.uid()));
  END IF;
END;
$$;

-- Inserir permissões padrão do sistema
INSERT INTO public.resource_permissions (module, permission) VALUES
  ('expenses', 'view'),
  ('expenses', 'create'),
  ('expenses', 'edit'),
  ('expenses', 'delete'),
  ('users', 'view'),
  ('users', 'create'),
  ('users', 'edit'),
  ('users', 'delete'),
  ('categories', 'view'),
  ('categories', 'create'),
  ('categories', 'edit'),
  ('categories', 'delete'),
  ('projects', 'view'),
  ('projects', 'create'),
  ('projects', 'edit'),
  ('projects', 'delete');