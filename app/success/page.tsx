import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="grid min-h-[75vh] place-items-center bg-ivory px-5 py-16 text-center">
      <div>
        <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-champagne font-serif text-3xl text-champagne">R</div>
        <h1 className="section-title">Thank you.</h1>
        <p className="body-copy mx-auto mt-5 max-w-md">
          Your mock order has been received. The next migration step will replace this with a Cloudflare Worker order endpoint and Ziina checkout session.
        </p>
        <Link href="/" className="btn-primary mt-8">Return to Atelier</Link>
      </div>
    </section>
  );
}
