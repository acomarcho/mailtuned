import Link from "next/link";
import { Button } from "../ui/button";

export default function StepsButton({
  prevPage,
  nextPage,
}: {
  prevPage: number | null;
  nextPage: number | null;
}) {
  return (
    <div className="flex justify-between">
      {prevPage ? (
        <Link href={`/steps/${prevPage}`}>
          <Button>Previous step</Button>
        </Link>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Link href={`/steps/${nextPage}`}>
          <Button>Next step</Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
