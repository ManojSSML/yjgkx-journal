import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import JournalInfoTable from '../components/JournalInfoTable';
import ArticleCard from '../components/ArticleCard';

// Fallback data shown when Sanity is not connected
const fallbackJournalInfo = {
  chineseTitle: 'Yingyong Jichu yu Gongcheng Kexue Xuebao/Journal of Basic Science and Engineering',
  publisher: 'Editorial Board of Journal of Basic Science and Engineering',
  issn: '1005-0930',
  subjectArea: 'Engineering: General Engineering',
  email: 'editor@domain',
  sjrScore: '0.27',
  quartile: 'Q3',
  year: '2026',
  currentIssueLabel: 'CURRENT ISSUE',
};

const fallbackIssue = {
  volume: 23,
  number: 1,
  year: 2026,
  articles: [
    {
      _id: '1',
      title: 'A Short Review on 2D Mesh Topology for Networks-on-Chip and its Popular Routing strategies',
      authors: ['Abhijit Biswas', 'Sourish Dhar'],
      pageStart: 1, pageEnd: 21, pdfUrl: '#',
      slug: { current: 'a-short-review-on-2d-mesh-topology' },
    },
    {
      _id: '2',
      title: 'EFFECTIVENESS OF CORE ACTIVATION EXERCISES IN DESK JOB WORKERS WITH LOW BACK PAIN',
      authors: ['Tyson Newton Fernandez', 'Dr.Namrata Kadam'],
      pageStart: 22, pageEnd: 28, pdfUrl: '#',
      slug: { current: 'effectiveness-of-core-activation-exercises' },
    },
    {
      _id: '3',
      title: 'PREVALENCE OF IMBALANCE AND INCO-ORDINATION IN BELOW KNEE AMPUTEES',
      authors: ['Mr. Omkar Vivek Shinde', 'Dr. Tejashree Omkar Kumbhar'],
      pageStart: 29, pageEnd: 39, pdfUrl: '#',
      slug: { current: 'prevalence-of-imbalance-and-inco-ordination' },
    },
    {
      _id: '4',
      title: 'A Hue-Based Segmentation for Melody Watermelon Images Before Harvesting',
      authors: ['Ayesha Khannum', 'R. Dhanesha', 'Narendra Kumar S.', 'Umesha D. K.', 'Shrinivasa Naika C. L.'],
      pageStart: 40, pageEnd: 53, pdfUrl: '#',
      slug: { current: 'hue-based-segmentation-for-melody-watermelon' },
    },
    {
      _id: '5',
      title: 'IMPACT OF INTEGRATED AWARENESS PROGRAMME ON BEHAVIOURAL OUTCOMES REGARDING PREVENTION AND MANAGEMENT OF DIABETES IN PREGNANCY WITH REFERENCE TO NATIONAL GUIDELINES AMONG ANTENATAL WOMEN RESIDING AT BHILAI CHHATTISGARH',
      authors: ['Aruna P. Masih'],
      pageStart: 54, pageEnd: 68, pdfUrl: '#',
      slug: { current: 'impact-of-integrated-awareness-programme-diabetes' },
    },
  ],
};

const pageStyles = `
  .main-content-wrap {
    flex: 1;
    width: 100%;
    max-width: 1296px;
    margin: 0 auto;
    padding: 20px 12px;
    font-family: 'IBM Plex Sans', Arial, sans-serif;
    font-size: 16px;
  }
  .main-layout {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .main-articles {
    flex: 1;
    min-width: 0;
  }
  @media (max-width: 900px) {
    .main-layout {
      flex-direction: column;
    }
  }
`;

// No caching - always fetch fresh
export const revalidate = 0;
export const dynamic = 'force-dynamic';

async function getData() {
  if (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'
  ) {
    try {
      const { getJournalInfo, getCurrentIssue } = await import('../lib/queries');
      // NOTE: ensure getCurrentIssue() fetches slug for each article, e.g.:
      // *[_type=="issue" && current==true][0]{ ..., articles[]->{ _id, title, authors, pageStart, pageEnd, pdfExternalUrl, "pdfUrl": pdfFile.asset->url, slug } }
      const [journalInfo, currentIssue] = await Promise.all([
        getJournalInfo(),
        getCurrentIssue(),
      ]);
      console.log('✅ Sanity data fetched:', { journalInfo, currentIssue });
      return {
        journalInfo: journalInfo || fallbackJournalInfo,
        currentIssue: currentIssue || fallbackIssue,
        fromSanity: true,
      };
    } catch (e) {
      console.error('❌ Sanity fetch failed:', e);
    }
  } else {
    console.warn('⚠️ No Sanity Project ID found — using fallback data');
  }
  return { journalInfo: fallbackJournalInfo, currentIssue: fallbackIssue, fromSanity: false };
}

export default async function HomePage() {
  const { journalInfo, currentIssue, fromSanity } = await getData();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <main className="main-content-wrap">
        <div className="main-layout">
          {/* Main Content */}
          <div className="main-articles">
            <JournalInfoTable info={journalInfo} />

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#5D6778', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                {journalInfo?.currentIssueLabel || 'CURRENT ISSUE'}
              </h2>
              <p style={{ fontSize: '20px', color: '#555', marginBottom: '12px' }}>
                Volume {currentIssue.volume}, No. {currentIssue.number} ({currentIssue.year})
              </p>
              <p style={{ fontSize: '20px', color: '#777', marginBottom: '16px' }}>Articles</p>

              <div>
                {currentIssue.articles?.map((article: any) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>

              <a
                href="/archives"
                style={{ backgroundColor: '#0d7070', color: '#fff', fontSize: '15px', padding: '10px 20px', display: 'inline-block', marginTop: '16px', borderRadius: '2px', fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                View all issue &gt;
              </a>
            </section>
          </div>

          {/* Sidebar */}
          <Sidebar
            sjrScore={journalInfo?.sjrScore || '0.27'}
            quartile={journalInfo?.quartile || 'Q3'}
          />
        </div>
      </main>

      <Footer year={journalInfo?.year || '2026'} email={journalInfo?.email || 'editor@domain'} />
    </div>
  );
}