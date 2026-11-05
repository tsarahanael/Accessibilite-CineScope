import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import {
  readRequest,
  requestOptions,
  type RequestDialogProps,
  type RequestErrors,
} from "../requests";

export default function RequestDialog({ workshop, onClose, onSubmit }: RequestDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const choiceRef = useRef<HTMLSelectElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<RequestErrors>({});

  const ids = {
    choice: `question-choice-${workshop.id}`,
    contact: `question-contact-${workshop.id}`,
    message: `question-message-${workshop.id}`,
    title: `question-title-${workshop.id}`,
    context: `question-context-${workshop.id}`,
    summary: `question-errors-${workshop.id}`,
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    choiceRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0) errorSummaryRef.current?.focus();
  }, [errors]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = readRequest(event.currentTarget, "question", workshop.id);
    setErrors(result.errors);
    if (Object.keys(result.errors).length === 0) onSubmit(result.values);
  };

  const focusField = (field: keyof RequestErrors) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (field === "choice") choiceRef.current?.focus();
    if (field === "contact") contactRef.current?.focus();
    if (field === "message") messageRef.current?.focus();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={ids.title}
      aria-describedby={ids.context}
      onKeyDown={event => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="dialog-heading">
        <h2 id={ids.title}>Question pour {workshop.title}</h2>
        <button
          type="button"
          className="close-button"
          aria-label="Fermer la fenêtre de question"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <p className="dialog-context" id={ids.context}>
        Votre demande concerne l’atelier de {workshop.location}. Aucun message ni aucune coordonnée ne seront transmis.
      </p>

      <form noValidate onSubmit={handleSubmit}>
        {Object.keys(errors).length > 0 && (
          <div className="error-summary" ref={errorSummaryRef} tabIndex={-1} aria-labelledby={ids.summary}>
            <h3 id={ids.summary}>La demande n’a pas été envoyée. Corrigez les champs suivants :</h3>
            <ul>
              {errors.choice && <li><a href={`#${ids.choice}`} onClick={focusField("choice")}>{errors.choice}</a></li>}
              {errors.contact && <li><a href={`#${ids.contact}`} onClick={focusField("contact")}>{errors.contact}</a></li>}
              {errors.message && <li><a href={`#${ids.message}`} onClick={focusField("message")}>{errors.message}</a></li>}
            </ul>
          </div>
        )}

        <div className="field">
          <label htmlFor={ids.choice}>Sujet de votre question <span aria-hidden="true">*</span></label>
          <select
            ref={choiceRef}
            id={ids.choice}
            name="choice"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.choice)}
            aria-describedby={errors.choice ? `${ids.choice}-help ${ids.choice}-error` : `${ids.choice}-help`}
          >
            <option value="" disabled>Choisissez un sujet</option>
            {requestOptions.question.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <p className="field-help" id={`${ids.choice}-help`}>Sélectionnez le sujet qui correspond à votre demande.</p>
          {errors.choice && <p className="field-error" id={`${ids.choice}-error`}>{errors.choice}</p>}
        </div>

        <div className="field">
          <label htmlFor={ids.contact}>Adresse électronique <span aria-hidden="true">*</span></label>
          <input
            ref={contactRef}
            id={ids.contact}
            name="contact"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? `${ids.contact}-help ${ids.contact}-error` : `${ids.contact}-help`}
          />
          <p className="field-help" id={`${ids.contact}-help`}>Exemple : prenom@example.fr. L’envoi est simulé, aucun courriel ne sera envoyé.</p>
          {errors.contact && <p className="field-error" id={`${ids.contact}-error`}>{errors.contact}</p>}
        </div>

        <div className="field">
          <label htmlFor={ids.message}>Votre question <span aria-hidden="true">*</span></label>
          <textarea
            ref={messageRef}
            id={ids.message}
            name="message"
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${ids.message}-help ${ids.message}-error` : `${ids.message}-help`}
          />
          <p className="field-help" id={`${ids.message}-help`}>Décrivez l’information que vous souhaitez obtenir.</p>
          {errors.message && <p className="field-error" id={`${ids.message}-error`}>{errors.message}</p>}
        </div>

        <div className="dialog-actions">
          <button type="submit" className="primary-button">Envoyer la question</button>
          <button type="button" className="secondary-button" onClick={onClose}>Annuler</button>
        </div>
        <p className="simulation-note">Démonstration locale : aucune demande réelle ne sera transmise.</p>
      </form>
    </dialog>
  );
}
