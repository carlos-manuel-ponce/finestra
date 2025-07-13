import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nizcybhmfaacojafxhhu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pemN5YmhtZmFhY29qYWZ4aGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODk1ODAsImV4cCI6MjA2NTY2NTU4MH0.PmVgbS7inwoEeLBfFz39iEMAvcut6s3gp28ayGPXWq8'

export const supabase = createClient(supabaseUrl, supabaseKey)