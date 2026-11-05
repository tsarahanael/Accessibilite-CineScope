import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";

afterEach(cleanup);

describe("Question à l’organisateur", () => {
  it("ouvre une modale pour l’atelier choisi, y compris lorsqu’il est complet, et restaure le focus à la fermeture", async () => {
    const user = userEvent.setup();
    render(<App />);
    const opener = screen.getByRole("button", { name: "Poser une question au sujet de Broder un petit paysage" });

    await user.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Question pour Broder un petit paysage" });
    expect(within(dialog).getByRole("combobox", { name: /Sujet de votre question/ })).toHaveValue("");
    expect(within(dialog).getByRole("option", { name: "Les horaires" })).toBeInTheDocument();
    expect(within(dialog).getByRole("option", { name: "Le matériel à apporter" })).toBeInTheDocument();
    expect(within(dialog).getByRole("option", { name: "L’accès au lieu" })).toBeInTheDocument();
    expect(within(dialog).getByRole("option", { name: "Un autre sujet" })).toBeInTheDocument();
    expect(within(dialog).getByRole("combobox")).toHaveFocus();

    await user.click(within(dialog).getByRole("button", { name: "Annuler" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(screen.queryByText(/Votre question sur/)).not.toBeInTheDocument();
  });

  it("conserve le sujet et la question après un envoi sans courriel, puis confirme l’atelier et le sujet après correction", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Poser une question au sujet de Une tasse en céramique" }));

    const dialog = screen.getByRole("dialog", { name: "Question pour Une tasse en céramique" });
    const subject = within(dialog).getByRole("combobox", { name: /Sujet de votre question/ });
    const contact = within(dialog).getByRole("textbox", { name: /Adresse électronique/ });
    const message = within(dialog).getByRole("textbox", { name: /Votre question/ });
    await user.selectOptions(subject, "materiel");
    await user.type(message, "Le matériel est-il fourni ?");
    await user.click(within(dialog).getByRole("button", { name: "Envoyer la question" }));

    const summary = within(dialog).getByText(/La demande n’a pas été envoyée/).closest(".error-summary");
    expect(summary).toHaveFocus();
    expect(within(dialog).getAllByText(/Saisissez une adresse électronique/)).toHaveLength(2);
    expect(dialog).toBeInTheDocument();
    expect(subject).toHaveValue("materiel");
    expect(message).toHaveValue("Le matériel est-il fourni ?");
    expect(screen.queryByText(/Votre question sur/)).not.toBeInTheDocument();
    await user.click(within(dialog).getByRole("link", { name: /Saisissez une adresse électronique/ }));
    expect(contact).toHaveFocus();
    await user.type(contact, "personne@example.fr");
    await user.click(within(dialog).getByRole("button", { name: "Envoyer la question" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const confirmation = screen.getByText(/Votre question sur/).parentElement;
    expect(confirmation).toHaveTextContent("Une tasse en céramique");
    expect(confirmation).toHaveTextContent("Le matériel à apporter");
    expect(confirmation).not.toHaveTextContent("personne@example.fr");
    expect(confirmation).toHaveFocus();
  });

  it("refuse un courriel mal formé et une question composée uniquement d’espaces", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Poser une question au sujet de Premiers pas en sérigraphie" }));

    const dialog = screen.getByRole("dialog", { name: "Question pour Premiers pas en sérigraphie" });
    await user.selectOptions(within(dialog).getByRole("combobox"), "horaires");
    await user.type(within(dialog).getByRole("textbox", { name: /Adresse électronique/ }), "pas-un-email");
    await user.type(within(dialog).getByRole("textbox", { name: /Votre question/ }), "   ");
    await user.click(within(dialog).getByRole("button", { name: "Envoyer la question" }));

    expect(within(dialog).getAllByText(/adresse électronique au format/)).toHaveLength(2);
    expect(within(dialog).getAllByText("Écrivez votre question.")).toHaveLength(2);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByText(/Votre question sur/)).not.toBeInTheDocument();
  });
});
