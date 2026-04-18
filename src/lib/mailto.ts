/**
 * Construit une URL mailto avec encodage correct des paramètres (sujet, corps).
 * Le destinataire reste en clair ; subject/body passent par URLSearchParams.
 */
export function buildMailto(opts: {
  to: string
  subject: string
  body: string
}): string {
  const { to, subject, body } = opts
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return query ? `mailto:${to}?${query}` : `mailto:${to}`
}
