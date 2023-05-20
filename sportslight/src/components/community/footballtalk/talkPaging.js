import { useSelector } from 'react-redux';

const TalkPaging = ({ RenderingPaging }) => {
  const talkpageDto = useSelector((state) =>
    state.talk.talkpageDto ? state.talk.talkpageDto : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = talkpageDto.startPage; i <= talkpageDto.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className='paginationAll'
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingRight: '30px',
        fontSize: 'large',
      }}
    >
      <nav arial-label='...'>
        <ul
          className='pagination'
          style={{
            display: 'flex',
            listStyle: 'none',
            marginBlockEnd: 'unset',
          }}
        >
          <li
            className={
              talkpageDto.startPage <= 1 ? 'page-item disabled' : 'page-item'
            }
          >
            <span
              className='page-link'
              style={{ padding: '1px 5px 1px 5px' }}
              onClick={() =>
                RenderingPaging(talkpageDto.startPage - talkpageDto.blockPage)
              }
            >
              &laquo;
            </span>
          </li>

          {pageNumbers.map((pageNum, idx) => (
            <li
              key={pageNum}
              className={
                talkpageDto.currentPage === pageNum ? 'page-item active' : null
              }
              aria-current={talkpageDto.currentPage === pageNum ? 'page' : null}
            >
              <span
                className='page-link'
                onClick={() => RenderingPaging(pageNum)}
                style={{ cursor: 'pointer', padding: '1px 5px 1px 5px' }}
              >
                {pageNum}
              </span>
            </li>
          ))}

          <li
            className={
              talkpageDto.endPage >= talkpageDto.totalPage
                ? 'page-item disabled'
                : 'page-item'
            }
          >
            <span
              className='page-link'
              style={{ padding: '1px 5px 1px 5px' }}
              onClick={() =>
                RenderingPaging(talkpageDto.startPage + talkpageDto.blockPage)
              }
            >
              &raquo;
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TalkPaging;
