import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import CertificationsSlideshow from "../components/ui/CertificationsSlideshow";
import LazyImage from "../components/ui/LazyImage";
import { honors } from "../data";
import { useSearch } from "../context/SearchContext";

const HonorsPage = () => {
  const { selectedItem, setSelectedItem } = useSearch();

  return (
    <>
      <title>Honors & Awards | Hanson-Tube</title>
      <meta
        name="description"
        content="Honors, military awards, and professional achievements earned by Kobby Hanson including Airman of the Year and President's List."
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
                className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card cursor-pointer overflow-hidden rounded-lg bg-gray-200 text-left transition-all duration-300 hover:-translate-y-2"
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
                  <h3 className="mb-1 truncate text-lg font-bold text-gray-900 dark:text-gray-300">
                    {honor.title}
                  </h3>
                  <div className="h-10 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
                    {honor.summary.map((line, i) => (
                      <p key={i} className="truncate">
                        {line}
                      </p>
                    ))}
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
