function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-black text-white py-1 md:px-4 border-t border-gray-700">
      <div className="flex flex-col items-center justify-between gap-1 md:h-16 md:flex-row">
        <span className="text-lg font-semibold">
          Built by{" "}
          <a
            href="https://github.com/abrshDev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-yellow-400 transition-colors duration-300"
          >
            AbDev
          </a>
        </span>
        <span className="text-lg font-semibold">
          The source code is available on{" "}
          <a
            href="https://github.com/abrshDev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-yellow-400 transition-colors duration-300"
          >
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
