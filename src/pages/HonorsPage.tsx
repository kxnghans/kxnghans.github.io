import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import CertificationsSlideshow from "../components/ui/CertificationsSlideshow";
import LazyImage from "../components/ui/LazyImage";
import { honors } from "../data";
import { useSearch } from "../context/SearchContext";
import { UI_SURFACES, UI_TYPOGRAPHY } from "../theme";
import SummaryTextLines from "../components/ui/SummaryTextLines";

const HonorsPage = () => {
  const { selectedItem, setSelectedItem } = useSearch();

  return (
    <>
      <title>Honors & Awards | Hanson-Tube</title>
      <meta
        name="description"
        content="Awards and distinctions earned by Kobby Hanson, including Airman of the Year and 7x Dean's List honors."
      />
      <div className="flex flex-col">
        <Section title="Honors & Awards">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {honors.map((honor, index) => (
              <div
                key={index}
                id={`honor-${index}`}
                role="button"
                tabIndex={0}
                className={UI_SURFACES.cardInteractive}
                onClick={() => setSelectedItem(honor.details)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedItem(honor.details);
                  }
                }}
              >
                <LazyImage
                  src={honor.imageUrl}
                  alt={honor.title}
                  className="h-40 w-full object-cover"
                  containerClassName="h-40 w-full"
                />
                <div className="p-4">
                  <h3 className={`mb-1 ${UI_TYPOGRAPHY.cardTitleSm}`}>
                    {honor.title}
                  </h3>
                  <div
                    className={`h-10 overflow-hidden ${UI_TYPOGRAPHY.cardSummary}`}
                  >
                    <SummaryTextLines lines={honor.summary} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div className="mb-8">
          <CertificationsSlideshow />
        </div>
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </>
  );
};

export default HonorsPage;
