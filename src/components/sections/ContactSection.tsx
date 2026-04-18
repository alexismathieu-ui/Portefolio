import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { profile } from '../../data/profile'
import { buildMailto } from '../../lib/mailto'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' })

  const onSubmit = (data: FormValues) => {
    const body = [
      `Nom : ${data.name}`,
      `E-mail : ${data.email}`,
      '',
      data.message,
    ].join('\n')

    const url = buildMailto({
      to: profile.email,
      subject: data.subject,
      body,
    })
    const a = document.createElement('a')
    a.href = url
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="section__head">
        <h2>Contact</h2>
        <p className="section__intro">
          Écrivez-moi : le formulaire ouvre votre client mail avec le message prérempli.
        </p>
      </div>

      <div className="contact__layout">
        <form className="contact__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="field">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              autoComplete="name"
              {...register('name', { required: 'Le nom est requis.' })}
            />
            {errors.name ? (
              <p className="field__error" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'L’e-mail est requis.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Format d’e-mail invalide.',
                },
              })}
            />
            {errors.email ? (
              <p className="field__error" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="subject">Sujet</label>
            <input
              id="subject"
              {...register('subject', { required: 'Le sujet est requis.' })}
            />
            {errors.subject ? (
              <p className="field__error" role="alert">
                {errors.subject.message}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              {...register('message', {
                required: 'Le message est requis.',
                minLength: { value: 20, message: 'Minimum 20 caractères.' },
              })}
            />
            {errors.message ? (
              <p className="field__error" role="alert">
                {errors.message.message}
              </p>
            ) : null}
          </div>

          <div className="contact__actions">
            <button type="submit" className="btn btn--primary">
              Ouvrir dans mon client mail
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={copyEmail}
            >
              {copied ? 'Copié !' : 'Copier l’e-mail'}
            </button>
          </div>
        </form>

        <aside className="contact__aside" aria-label="Réseaux sociaux">
          <p className="contact__email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <ul className="contact__social">
            {profile.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
