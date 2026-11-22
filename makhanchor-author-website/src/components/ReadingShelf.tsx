import { SHELF_BOOKS, ShelfBook } from '../data';

function BookCard({ book }: { book: ShelfBook }) {
  const isAffiliate = Boolean(book.amazonUrl && /tag=|aff[_-]?id/i.test(book.amazonUrl));

  return (
    <article className="group flex h-full flex-col rounded-[18px] border border-[#e7ddd5] bg-[#fffdfa] p-5 text-brand-charcoal sm:p-7">
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title} by ${book.author}`}
          className="mb-6 aspect-[3/4] w-full rounded-lg object-cover"
          loading="lazy"
        />
      ) : (
        <div className="mb-6 flex aspect-[3/4] max-h-72 w-full flex-col justify-between rounded-lg border border-brand-coral/20 bg-[#f3ebe3] p-5" aria-hidden="true">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#963e2c]">Makhanchor shelf</span>
          <p className="font-serif text-3xl leading-[0.95]">{book.title}</p>
          <span className="text-xs text-[#625854]">{book.author}</span>
        </div>
      )}
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#963e2c]">{book.category}</p>
      <h3 className="mt-2 font-serif text-3xl leading-none">{book.title}</h3>
      <p className="mt-2 text-sm font-semibold text-[#625854]">by {book.author}</p>
      {book.note && <p className="mt-4 border-l-2 border-brand-coral pl-3 text-sm italic text-[#625854]">{book.note}</p>}
      <p className="mt-4 text-sm leading-6 text-[#625854]">{book.description}</p>
      <p className="mt-4 text-sm leading-6">
        <strong className="text-[#963e2c]">Read this if…</strong>{' '}
        <span className="text-[#625854]">{book.readIf}</span>
      </p>
      {book.amazonUrl && (
        <div className="mt-auto pt-6">
          {isAffiliate && <p className="mb-2 text-xs text-[#625854]">Affiliate link</p>}
          <a
            href={book.amazonUrl}
            target="_blank"
            rel={isAffiliate ? 'sponsored nofollow noopener' : 'noopener'}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-coral px-5 py-3 text-sm font-bold text-[#241311] transition-colors hover:bg-[#f1aa96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            View on Amazon.in
          </a>
        </div>
      )}
    </article>
  );
}

export default function ReadingShelf() {
  const fiction = SHELF_BOOKS.filter((book) => book.category === 'Fiction');
  const nonfiction = SHELF_BOOKS.filter((book) => book.category === 'Nonfiction');
  const hasAffiliateLinks = SHELF_BOOKS.some((book) => book.amazonUrl && /tag=|aff[_-]?id/i.test(book.amazonUrl));

  return (
    <section className="min-h-screen bg-brand-cream text-brand-charcoal">
      <div className="bg-brand-obsidian text-brand-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-10 md:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f1a891]">Makhanchor’s bookshelf</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.82] tracking-[-0.055em] sm:text-7xl">
              The Reading <em className="font-medium text-brand-coral">Shelf.</em>
            </h1>
            <p className="mt-7 max-w-xl leading-7 text-[#e2d6d1]">
              Fiction for changing perspectives and nonfiction for practical or reflective reading.
            </p>
          </div>
          <aside className="rounded-[5px_17px_17px_5px] border border-[#a66e5c77] bg-[#20181a] p-8 shadow-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#f1a891]">A reading note</p>
            <h2 className="mt-4 font-serif text-4xl italic leading-none text-[#fff4e9]">What do you want from your next book?</h2>
            <p className="mt-5 text-sm leading-6 text-[#e2cfc6]">Choose by the question you have, the feeling you want to explore, or the change you would like to try.</p>
          </aside>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
        {hasAffiliateLinks && (
          <p className="mb-5 border-l-2 border-brand-coral bg-[#f2ebe5] px-4 py-3 text-sm text-[#543e35]">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        )}

        <section aria-labelledby="fiction-heading">
          <h2 id="fiction-heading" className="font-serif text-5xl leading-none">Fiction</h2>
          <p className="mt-3 text-sm text-[#625854]">Stories for second chances, relationships, regret, and possibilities.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fiction.map((book) => <BookCard key={`${book.title}-${book.author}`} book={book} />)}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="nonfiction-heading">
          <h2 id="nonfiction-heading" className="font-serif text-5xl leading-none">Nonfiction</h2>
          <p className="mt-3 text-sm text-[#625854]">Books for habits, purpose, and understanding human choices.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nonfiction.map((book) => <BookCard key={`${book.title}-${book.author}`} book={book} />)}
          </div>
        </section>

        <section className="mt-14 border-t border-[#e7ddd5] pt-8" aria-labelledby="accessories-heading">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#963e2c]">Reading accessories</p>
          <h2 id="accessories-heading" className="mt-2 font-serif text-4xl">Beside the Book</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#625854]">
            Accessories will appear here only after they are supplied.
          </p>
        </section>
      </div>
    </section>
  );
}
