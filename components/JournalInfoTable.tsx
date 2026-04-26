interface JournalInfo {
  chineseTitle?: string;
  englishTitle?: string;
  publisher?: string;
  issn?: string;
  subjectArea?: string;
}

export default function JournalInfoTable({ info }: { info: JournalInfo }) {
  const publisher = info?.publisher || 'Editorial Board of Journal of Basic Science and Engineering';
  const issn = info?.issn || '1005-0930';
  const subjectArea = info?.subjectArea || 'Engineering: General Engineering';
  const heading = `${info?.chineseTitle || 'Yingyong Jichu yu Gongcheng Kexue Xuebao'}/${info?.englishTitle || 'Journal of Basic Science and Engineering'}`;

  return (
    <div style={{ marginBottom: '70px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <h5 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#5D6778', marginBottom: '12px', lineHeight: 1.4 }}>
        {heading}
      </h5>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
        <tbody>
          <tr style={{ border: '1px solid #d0d0d0' }}>
            <td style={{ padding: '8px 12px', color: '#555', width: '160px',     }}>Publisher</td>
            <td style={{ padding: '8px 12px', color: '#222' }}>{publisher}</td>
          </tr>
          <tr style={{ border: '1px solid #d0d0d0', borderTop: 'none' }}>
            <td style={{ padding: '8px 12px', color: '#555',     }}>ISSN</td>
            <td style={{ padding: '8px 12px', color: '#222' }}>{issn}</td>
          </tr>
          <tr style={{ border: '1px solid #d0d0d0', borderTop: 'none' }}>
            <td style={{ padding: '8px 12px', color: '#555',     }}>Subject Area</td>
            <td style={{ padding: '8px 12px', color: '#222' }}>{subjectArea}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}