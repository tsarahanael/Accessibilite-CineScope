import { useState, type ReactNode } from "react";
import type { Workshop } from "../workshops";

type Props = {
  workshop: Workshop;
  onReserve: (workshop: Workshop) => void;
  extraAction?: ReactNode;
};

export default function WorkshopCard({ workshop, onReserve, extraAction }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="workshop-card">
      <div className="card-art">
        <img src={workshop.image} alt={workshop.imageAlt} />
        <span className="category">{workshop.category}</span>
      </div>
      <div className="card-body">
        <p className="workshop-date">{workshop.date}</p>
        <h3 className="workshop-title" tabIndex={0}>{workshop.title}</h3>
        <p className="location">{workshop.location}</p>
        <div className="card-meta"><span>{workshop.duration}</span><span>{workshop.price}</span></div>
        <p className="availability">
          <span className={"availability-dot " + (workshop.available ? "is-available" : "is-full")} aria-hidden="true" />
          {workshop.available ? "Places disponibles" : "Complet"}
        </p>
        <button aria-label={expanded ? `Replier les détails de l’atelier ${workshop.title}` : `Voir les détails de l’atelier ${workshop.title}`} className="details-trigger" onClick={() => setExpanded(value => !value)}>
          Détails de l’atelier <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
        <div className={"details-panel " + (expanded ? "is-open" : "")} hidden={!expanded}>
          <div className="details-inner">
            <p>{workshop.description}</p>
            <a aria-label={`Consulter les informations pratiques pour l'atelier ${workshop.title}`} href="#infos-pratiques">
              Consulter les informations pratiques
            </a>
          </div>
        </div>
        <div className="card-actions">
          {workshop.available ? (
            <button aria-label={`S'inscrire à l'atelier ${workshop.title}`} type="button" className="reserve-button" onClick={() => onReserve(workshop)}>
              M’inscrire à {workshop.title}
            </button>
          ) : <p className="closed-message">Inscriptions closes</p>}
          {extraAction}
        </div>
      </div>
    </article>
  );
}
