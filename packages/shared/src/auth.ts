import { getSupabase } from "./supabaseClient";

// Le nom d'affichage est transmis a Supabase dans les metadonnees du compte.
// Le declencheur SQL on_auth_user_created le lit pour creer le profil.
// Si aucun nom n'est donne (cas du mobile), le profil prend le debut de l'email.
export async function sInscrire(
  email: string,
  motDePasse: string,
  nom?: string
) {
  const { data, error } = await getSupabase().auth.signUp({
    email,
    password: motDePasse,
    options: { data: { nom } },
  });
  if (error) throw error;
  return data;
}

export async function seConnecter(email: string, motDePasse: string) {
  const { data, error } = await getSupabase().auth.signInWithPassword({
    email,
    password: motDePasse,
  });
  if (error) throw error;
  return data;
}

export async function seDeconnecter() {
  const { error } = await getSupabase().auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await getSupabase().auth.getSession();
  return data.session;
}
