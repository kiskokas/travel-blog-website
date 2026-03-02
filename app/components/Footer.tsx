const Footer = () => {
  return (
    <footer className="bg-black text-white/150 uppercase text-[10px] text-center p-4 flex justify-center items-center gap-4">
      <span>© {new Date().getFullYear()} Travel blog</span>
    </footer>
  );
};

export default Footer;