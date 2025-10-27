import CardDetailsView from "./CardDetailsView";

type PageProps = {
  params: Promise<{ value: string }>;
};

export default async function Page({ params }: PageProps) {
  const { value } = await params;

  return (
    <div>
      <CardDetailsView cardId={value} />
    </div>
  );
}
