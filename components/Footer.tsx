export default function Footer({ year = '2026', email = 'editor@domain' }: { year?: string; email?: string }) {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 text-sm mt-8">
      <p>©{year} by Journal of Basic Science and Engineering. All rights reserved.</p>
      <p className="mt-1">
        Email:{' '}
        <a href={`mailto:${email}`} className="hover:text-white transition-colors">
          {email}
        </a>
      </p>
    </footer>
  );
}