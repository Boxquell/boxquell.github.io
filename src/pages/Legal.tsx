import type { ReactNode } from "react";
import { Link } from "../components/Link";
import { OWNER, SITE } from "../site";

type Lang = "de" | "en";

function Address({ lang, email = true }: { lang: Lang; email?: boolean }) {
  return (
    <address>
      {OWNER.name}
      <br />
      {OWNER.street}
      <br />
      {OWNER.zip} {OWNER.city}
      <br />
      {OWNER.country[lang]}
      {email && (
        <>
          <br />
          <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
        </>
      )}
    </address>
  );
}

function Page({ title, updated, other, children }: { title: string; updated: string; other: { to: string; label: string }; children: ReactNode }) {
  return (
    <article className="wrap legal">
      <p className="legal-switch">
        <Link to={other.to}>{other.label}</Link>
      </p>
      <h1>{title}</h1>
      <p className="muted">{updated}</p>
      {children}
    </article>
  );
}

export function Imprint({ lang }: { lang: Lang }) {
  if (lang === "de") {
    return (
      <Page title="Impressum" updated="Stand: November 2026" other={{ to: "/en/legal-notice", label: "English version" }}>
        <h2>Angaben gemäß § 5 DDG</h2>
        <Address lang="de" email={false} />
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
        </p>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>{OWNER.name} (Anschrift wie oben)</p>
        <h2>Über das Projekt</h2>
        <p>
          Boxquell ist ein privates Open-Source-Projekt. Der Quellcode steht wahlweise unter der MIT-Lizenz oder der Apache-Lizenz 2.0. Boxquell ist mit den Herstellern der Agents, Werkzeuge und Betriebssysteme, die sich damit
          installieren lassen, nicht verbunden und wird von ihnen nicht unterstützt; deren Namen und Marken gehören ihren jeweiligen Inhabern.
        </p>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <h2>Haftung für Links</h2>
        <p>
          Dieses Angebot enthält Links zu externen Websites Dritter (insbesondere GitHub), auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
          stets der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Der Quellcode von Boxquell steht unter der MIT-Lizenz oder der Apache-Lizenz 2.0. Beiträge Dritter sind als
          solche gekennzeichnet.
        </p>
      </Page>
    );
  }
  return (
    <Page title="Legal notice" updated="Last updated: November 2026" other={{ to: "/impressum", label: "Deutsche Fassung" }}>
      <h2>Information pursuant to § 5 DDG (German Digital Services Act)</h2>
      <Address lang="en" email={false} />
      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
      </p>
      <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
      <p>{OWNER.name} (address as above)</p>
      <h2>About the project</h2>
      <p>
        Boxquell is a private open-source project. Its source code is licensed under the MIT License or the Apache License 2.0, at your choice. Boxquell is not affiliated with or endorsed by the makers of the agents, tools and operating
        systems it can install; their names and trademarks belong to their respective owners.
      </p>
      <h2>Liability for content</h2>
      <p>
        As a service provider I am responsible for my own content on these pages in accordance with general law (§ 7 (1) DDG). Under §§ 8 to 10 DDG, however, I am not obliged to monitor third-party information transmitted or stored, or
        to investigate circumstances that indicate illegal activity.
      </p>
      <h2>Liability for links</h2>
      <p>
        This site contains links to external third-party websites (in particular GitHub) whose content I have no influence over. I cannot accept any liability for such external content. The respective provider or operator is always
        responsible for the content of linked pages.
      </p>
      <h2>Copyright</h2>
      <p>
        The content and works created by the site operator are subject to German copyright law. The Boxquell source code is licensed under the MIT License or the Apache License 2.0. Third-party contributions are marked as such.
      </p>
      <p>The German version of this notice is legally binding.</p>
    </Page>
  );
}

export function Privacy({ lang }: { lang: Lang }) {
  if (lang === "de") {
    return (
      <Page title="Datenschutzerklärung" updated="Stand: November 2026" other={{ to: "/en/privacy", label: "English version" }}>
        <h2>Kurz gesagt</h2>
        <p>
          Diese Website setzt keine Cookies, nutzt keine Analyse- oder Tracking-Werkzeuge und lädt keine Inhalte von Dritten. Schriften, Bilder und Skripte kommen von derselben Adresse wie die Seite selbst. Erst wenn Sie einen Link zu GitHub
          anklicken, verlassen Sie diese Website.
        </p>
        <h2>Verantwortlicher</h2>
        <Address lang="de" />
        <h2>Hosting und Server-Logfiles</h2>
        {SITE.host === "github" ? (
          <>
            <p>
              Diese Website ({SITE.domain}) wird über GitHub Pages ausgeliefert, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (in der EU: GitHub B.V., Prins Bernhardplein 200, 1097 JB
              Amsterdam, Niederlande). Einen eigenen Server betreibe ich für diese Website nicht.
            </p>
            <p>
              Beim Aufruf verarbeitet GitHub technische Zugriffsdaten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit, die abgerufene Seite sowie Browser- und Betriebssystem-Kennung, um die Seite auszuliefern und den Dienst sicher
              zu betreiben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse ist die zuverlässige Bereitstellung dieser Website. Ich selbst habe keinen Zugriff auf diese Zugriffsdaten und werte sie nicht
              aus. Dabei können Daten in die USA übermittelt werden; GitHub stützt sich hierfür nach eigenen Angaben auf das EU-US Data Privacy Framework sowie Standardvertragsklauseln. Näheres steht in der{" "}
              <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">
                Datenschutzerklärung von GitHub
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p>
              Diese Website ({SITE.domain}) wird bei der Hetzner Online GmbH (Industriestr. 25, 91710 Gunzenhausen) in einem Rechenzentrum in Helsinki, Finnland, also innerhalb der Europäischen Union, gehostet. Mit dem Anbieter besteht ein
              Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
            </p>
            <p>
              Beim Aufruf verarbeitet der Server automatisch technische Zugriffsdaten: IP-Adresse, Datum und Uhrzeit, abgerufene Ressource, HTTP-Statuscode, Referrer sowie Browser- und Betriebssystem-Kennung. Das ist nötig, um die Seite
              auszuliefern und den Betrieb sicher und stabil zu halten (etwa zur Abwehr von Angriffen). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nicht mit anderen Daten zusammengeführt und gelöscht, sobald sie für
              diese Zwecke nicht mehr erforderlich sind.
            </p>
          </>
        )}
        <h2>Keine Cookies, keine Reichweitenmessung</h2>
        <p>
          Es werden weder Cookies gesetzt noch Daten im lokalen Speicher Ihres Browsers abgelegt. Es findet keine Reichweitenmessung statt. Die Erkennung Ihres Betriebssystems im Bereich „Install" (um den passenden Befehl
          vorauszuwählen) und das Kopieren eines Befehls in die Zwischenablage laufen ausschließlich in Ihrem Browser; dabei wird nichts übertragen.
        </p>
        <h2>Downloads und Links zu GitHub</h2>
        <p>
          Quellcode, Wiki und die Installationsdateien von Boxquell liegen bei GitHub (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Die Schaltflächen und Links dorthin sind einfache Hyperlinks; es sind keine
          GitHub-Inhalte, Widgets oder Zählpixel eingebunden. Erst wenn Sie einen solchen Link anklicken oder einen der Installationsbefehle ausführen, wird eine Verbindung zu GitHub aufgebaut, und GitHub verarbeitet dabei Daten wie
          Ihre IP-Adresse. Darauf habe ich keinen Einfluss; es gilt die{" "}
          <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">
            Datenschutzerklärung von GitHub
          </a>
          . Dabei können Daten in die USA übermittelt werden; GitHub stützt sich hierfür nach eigenen Angaben auf das EU-US Data Privacy Framework sowie Standardvertragsklauseln.
        </p>
        <h2>Kontaktaufnahme</h2>
        <p>
          Wenn Sie mich per E-Mail kontaktieren, verarbeite ich Ihre Angaben zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. f DSGVO. Die Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr
          erforderlich sind. Fehlermeldungen über GitHub-Issues sind öffentlich und unterliegen den Bedingungen von GitHub.
        </p>
        <h2>Die Software Boxquell</h2>
        <p>
          Diese Erklärung betrifft die Website. Die Software Boxquell läuft auf Ihrem eigenen Computer, braucht kein Konto und sendet keine Telemetrie. Sie verbindet sich mit GitHub, um die Kataloge der installierbaren Software aktuell
          zu halten und einmal täglich nach einer neuen Version zu sehen; beides lässt sich in den Einstellungen abschalten. Welche Ziele eine Sandbox erreicht, bestimmen Sie über die Netzwerkregeln; für die Verarbeitung dort ist der
          jeweilige Anbieter verantwortlich. Netzwerk-Log, Schlüssel und Verbrauchsdaten bleiben auf Ihrem Computer.
        </p>
        <h2>Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21).
          Wenden Sie sich dafür an die oben genannte Adresse.
        </p>
        <p>
          Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig ist: Die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen, Arndtstraße 1, 27570 Bremerhaven.
        </p>
      </Page>
    );
  }
  return (
    <Page title="Privacy policy" updated="Last updated: November 2026" other={{ to: "/datenschutz", label: "Deutsche Fassung" }}>
      <h2>In short</h2>
      <p>
        This website sets no cookies, uses no analytics or tracking tools and loads no content from third parties. Fonts, images and scripts come from the same address as the page itself. Only when you click a link to GitHub do you leave this
        website.
      </p>
      <h2>Controller</h2>
      <Address lang="en" />
      <h2>Hosting and server log files</h2>
      {SITE.host === "github" ? (
        <>
          <p>
            This website ({SITE.domain}) is delivered by GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (in the EU: GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, The
            Netherlands). I do not run a server of my own for this website.
          </p>
          <p>
            When you visit, GitHub processes technical access data, in particular your IP address, date and time, the page requested and browser/operating system identifier, to deliver the site and to run the service securely. The
            legal basis is Art. 6 (1) (f) GDPR; my legitimate interest is to provide this website reliably. I have no access to this access data myself and do not evaluate it. Data may be transferred to the USA; according to GitHub
            this is based on the EU-US Data Privacy Framework and standard contractual clauses. Details are in the{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">
              GitHub privacy statement
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <p>
            This website ({SITE.domain}) is hosted by Hetzner Online GmbH (Industriestr. 25, 91710 Gunzenhausen, Germany) in a data centre in Helsinki, Finland, inside the European Union. A data processing agreement pursuant to Art. 28 GDPR
            is in place.
          </p>
          <p>
            When you visit, the server automatically processes technical access data: IP address, date and time, requested resource, HTTP status code, referrer and browser/operating system identifier. This is necessary to deliver the site
            and to keep it running securely and reliably (for example to fend off attacks). The legal basis is Art. 6 (1) (f) GDPR. The data is not combined with other data and is deleted once it is no longer needed for these purposes.
          </p>
        </>
      )}
      <h2>No cookies, no audience measurement</h2>
      <p>
        No cookies are set and nothing is stored in your browser's local storage. There is no audience measurement. Detecting your operating system in the "Install" section (to preselect the matching command) and copying a command to
        the clipboard happen in your browser only; nothing is transmitted.
      </p>
      <h2>Downloads and links to GitHub</h2>
      <p>
        The source code, wiki and installation files of Boxquell are hosted on GitHub (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). The buttons and links that lead there are plain hyperlinks; no GitHub
        content, widgets or tracking pixels are embedded. Only when you click such a link or run one of the installation commands is a connection to GitHub made, and GitHub then processes data such as your IP address. I have no
        influence over this; the{" "}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">
          GitHub privacy statement
        </a>{" "}
        applies. Data may be transferred to the USA; according to GitHub this is based on the EU-US Data Privacy Framework and standard contractual clauses.
      </p>
      <h2>Contacting me</h2>
      <p>
        If you contact me by email, I process your details to handle the request. The legal basis is Art. 6 (1) (b) or (f) GDPR. The data is deleted once it is no longer needed for that purpose. Reports through GitHub issues are public
        and subject to GitHub's terms.
      </p>
      <h2>The Boxquell software</h2>
      <p>
        This policy covers the website. The Boxquell software runs on your own computer, needs no account and sends no telemetry. It connects to GitHub to keep the catalogues of installable software up to date and to look for a new
        version once a day; both can be switched off in its settings. Which destinations a sandbox reaches is decided by your network rules; the respective provider is responsible for processing there. The network log, keys and usage
        data stay on your computer.
      </p>
      <h2>Your rights</h2>
      <p>
        You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing (Art. 21). Please contact the address above.
      </p>
      <p>
        You also have the right to lodge a complaint with a data protection supervisory authority. The competent authority is: Die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen, Arndtstraße 1,
        27570 Bremerhaven, Germany.
      </p>
      <p>The German version of this policy is legally binding.</p>
    </Page>
  );
}
