import './materialModal.scss';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { Pie } from 'react-chartjs-2';
import React from 'react';

export class MaterialModal extends React.Component {
  toDate = date => {
    if (date) {
      const msec = new Date(Number(date));
      return `${msec.getDate()}/${msec.getMonth() + 1}/${msec.getFullYear()}`;
    }
    return '';
  };

  render() {
    const { closeModal, modalState, data } = this.props;
    let chartData = {};
    if (Object.keys(data).length) {
      chartData = {
        labels: ['Payout', 'Fee', 'Payment system comissions'],

        datasets: [
          {
            data: [
              data.priceInfo.price -
                data.priceInfo.fee -
                data.priceInfo.fixedCosts,
              data.priceInfo.fee,
              data.priceInfo.fixedCosts,
            ],

            backgroundColor: ['#BCD7F5', '#0051AD', '#73b0f4'],

            hoverBackgroundColor: ['#A6C0DE', '#00428D', '#669FDF'],
          },
        ],
      };
    }
    return (
      <>
        <div>
          <Modal
            className="modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalState}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Fade in={modalState} className="paper">
              <div>
                <div className="modal-wrapper">
                  <div className="artist">
                    <div className="artwork-title">
                      {data.title || data.artwork_title}
                      <span className="text-decorator-modal"> by</span>{' '}
                      {data.full_artist_name || data.artist_full_name}
                    </div>
                  </div>
                  <div className="artwork-wrapper">
                    <div className="image-wrapper">
                      <img
                        alt={data.title || data.artwork_title}
                        className="image"
                        src={data.primary_image || data.artwork_img}
                        title={data.title || data.artwork_title}
                      />
                    </div>
                    <div className="artwork-description">
                      <div className="description">
                        <div className="detail-wrapper">
                          <div>
                            <span className="text-decorator-modal">Style:</span>{' '}
                            {data.style}
                          </div>
                          <div>
                            <span className="text-decorator-modal">
                              Type of paint:
                            </span>{' '}
                            {data.medium}
                          </div>
                          <div>
                            <span className="text-decorator-modal">
                              Completed:
                            </span>{' '}
                            {this.toDate(data.completed)}
                          </div>
                        </div>
                        <div className="specification-wrapper">
                          <div>
                            <span className="text-decorator-modal">
                              Height:
                            </span>{' '}
                            {data.height || data.artwork_height} cm
                          </div>
                          <div>
                            <span className="text-decorator-modal">Width:</span>{' '}
                            {data.width || data.artwork_width} cm
                          </div>
                          <div>
                            <span className="text-decorator-modal">
                              Weight:
                            </span>{' '}
                            {data.weight || data.artwork_weight} g
                          </div>
                        </div>
                      </div>
                      <div className="price-wrapper">
                        <Pie width={300} data={chartData} />
                        <div>
                          <span className="text-decorator-modal">Price:</span>{' '}
                          {data.price} &euro;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </>
    );
  }
}
