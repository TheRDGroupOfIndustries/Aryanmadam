interface ContactBannerProps {
  message?: string;
  phoneLabel?: string;
}

export default function ContactBanner({
  message = "For more products details and customized bulk orders please Contact",
  phoneLabel = "+91-95605-35717",
}: ContactBannerProps) {
  return (
    <section className="bg-[rgb(44_95_124)] py-8 px-6 text-center">
      <p className="text-white text-base md:text-lg">
        {message}{" "}
        <a
          href="https://wa.me/919560535717"
          className="font-bold underline underline-offset-4 hover:text-[#e6cfa7] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {phoneLabel}
        </a>
      </p>
    </section>
  );
}

