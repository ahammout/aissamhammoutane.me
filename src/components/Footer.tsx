const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl font-bold text-gradient">Aissam Hammoutane</p>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Made with love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;