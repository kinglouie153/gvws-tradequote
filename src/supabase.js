// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xgnyftlfodavbyhwmmml.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnbnlmdGxmb2RhdmJ5aHdtbW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNDMwMzcsImV4cCI6MjA1OTgxOTAzN30.O_MkuOyNSNqw1Epi_JA6w7rQK0HLHBt_tXvKwkBSp1s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
