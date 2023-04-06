import { React, useEffect, useState } from 'react';
import { Col, Row, Rate, Progress, Tag } from 'antd';
import { TinyArea } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { palette, fontSet, avatar } from '../../theme';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import Avatar from 'antd/lib/avatar/avatar';
import { faArrowAltUp } from '@fortawesome/pro-solid-svg-icons';
import { connect } from 'react-redux';

const EquityViewFundDetails = ({
  // EquityViewFundDetails = defaultValue,
  securityDetails
}) => {

  const [sd, setSd] = useState(); // sd=securityDetais

  useEffect(() => {
    const newSd = {
      name: securityDetails[0]?.security?.securityName,
      id: securityDetails[0]?.security?.security,
      tagName: securityDetails[0]?.security?.securedType,
      secondaryTag: securityDetails[0]?.security?.assetType,
      risk: securityDetails[0]?.riskCategory,
      averagePrice: securityDetails?.averagePrice || '',
      value:
        securityDetails[0]?.security?.currencySymbol && securityDetails[0]?.latestPrice
          ? `${securityDetails[0]?.security?.currencySymbol} ${securityDetails[0]?.latestPrice}`
          : '',
      score: securityDetails[0]?.security?.score,
      category: securityDetails[0]?.category,
      sector: securityDetails[0]?.security?.sector,
      lastUpdate: securityDetails[0]?.lastUpdate,
      fund: securityDetails[0]?.fund,
      sp: securityDetails[0]?.securityProduct,
      alpha: securityDetails[0]?.alpha,
      downsideRisk: securityDetails[0]?.downsideRisk,
      isUp: securityDetails[0]?.isUp
    };
    setSd(newSd);
  }, [securityDetails]);

  const data = [0, 1000, 240, 340, 839, 810, 850];
  const config = {
    autoFit: true,
    data: data,
    smooth: false,
    areaStyle: {
      fill: `l(270) 0:#ffffff 1:${palette.text.success}`,
      fillOpacity: 0.1,

      shadowBlur: 3,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      cursor: 'pointer'
    },
    line: {
      color: palette.text.success
    }
  };
  const styleSet = {
    container: {
      fontSize: fontSet.body.xsmall,
      color: palette.text.dark
    },
    bannerId: {
      //fontSize: fontSet.body.xsmall,
      color: palette.text.main
    },
    subContainer: {
      fontSize: fontSet.body.xsmall,
      color: palette.text.dark,
      marginTop: '10px'
    },
    subStyle: {
      fontSize: fontSet.body.xsmall,
      color: palette.text.dark,
      marginTop: '10px',
      marginLeft: '2rem'
    },
    subCategory: {
      fontSize: fontSet.body.xsmall,
      color: palette.text.dark,
      marginLeft: '2rem'
    },
    subIcon: {
      marginTop: '10px'
    },
    mapBlock: {
      height: '65px',
      width: '300px'
    },
    cBlock: {
      fontSize: fontSet.body.xsmall,
      color: palette.text.dark,
      marginTop: '35px'
    },
    mBlock: {
      marginBottom: '40px'
    },
    block: {
      height: '25px',
      width: '135px'
    },
    subCardHeader: {
      fontSize: fontSet.body.large,
      color: palette.text.scard
    },
    sCardHeader: {
      fontSize: fontSet.body.xxlarge,
      color: sd?.isUp ? palette.text.scard : 'red'
    },
    eachTag: {
      fontSize: '0.6rem',
      borderRadius: '12px',
      padding: '0.2rem 0.2rem',
      color: '#354081',
      backgroundColor: '#D9DFFF;'
    }
  };
  return (
    <>
      <Row>
        <Col xxl={2} md={2} xl={2}>
          <Avatar style={avatar.smallAvatar} />
        </Col>
        <Col xxl={3} md={4}>
          <Row>
            <Col>
              <p>{sd?.name}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                {sd?.id} |{' '}
                {
                  <Rate
                    style={{
                      fontSize: '12px',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      color: '#48528D'
                    }}
                  />
                }
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ alignItems: 'center', margin: '5px 0px' }}>
                <Tag style={styleSet.eachTag}>{sd?.tagName}</Tag>
                <Tag style={styleSet.eachTag}>{sd?.secondaryTag}</Tag>
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={styleSet.subContainer}>
              <p style={{ fontWeight: '400' }}>Category</p>
              <p>{sd?.category}</p>
            </Col>
            <Col style={styleSet.subContainer} offset={1}>
              <p style={{ fontWeight: '400' }}>Sector</p>
              <p>{sd?.sector}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col style={styleSet.container}>
              <TypoGraphy clabel={sd?.averagePrice}>
                <div style={styleSet.sCardHeader}>{sd?.value || ''}</div>
              </TypoGraphy>
            </Col>
          </Row>
          <Row>
            <Col style={styleSet.cBlock}>
              <TypoGraphy label={'Last Update'}>
                <div style={styleSet.subCardHeader}>
                  {moment(sd?.lastUpdate).format('DD-MM-YYYY')}
                </div>
              </TypoGraphy>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <div style={styleSet.mapBlock}>
                <TinyArea {...config} />
              </div>
            </Col>
          </Row>
          <Row>
            <div style={styleSet.mBlock}></div>
          </Row>
          <Row>
            <Col style={styleSet.subStyle}>
              <TypoGraphy label={'Fund'}>
                <div style={styleSet.subCardHeader}>{sd?.fund}</div>
              </TypoGraphy>
            </Col>
            <Col style={styleSet.subStyle}>
              <TypoGraphy label={'S&P 500'}>
                <div style={styleSet.subCardHeader}>{sd?.sp}</div>
              </TypoGraphy>
            </Col>
            <Col style={styleSet.subCategory}>
              <TypoGraphy label={'Alpha'}>
                <FontAwesomeIcon
                  icon={faArrowAltUp}
                  style={{ color: '#05BC6A', marginRight: '0.5rem' }}
                />
                <span style={styleSet.subCardHeader}>{sd?.alpha}</span>
              </TypoGraphy>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <div style={styleSet.block}>
              <Progress
                strokeColor={{
                  '0%': '#55C1B3',
                  '100%': '#FFC122'
                }}
                percent={71}
                showInfo={false}
              />
            </div>
          </Row>
          <Row>
            <Col>
              <TypoGraphy label={'Risk'}>
                <div style={styleSet.subCardHeader}>{sd?.risk}</div>
              </TypoGraphy>
            </Col>

            <Col>
              <TypoGraphy label={'Score'}>
                <div style={styleSet.subCardHeader}>{sd?.score}</div>
              </TypoGraphy>
            </Col>
          </Row>
          <Row>
            <Col style={styleSet.cBlock}>
              <TypoGraphy label={'Downside Risk'}>
                <div style={styleSet.subCardHeader}>{sd?.downsideRisk}</div>
              </TypoGraphy>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    securityDetails: state?.tradeBookView?.tradeBookViewSecurityDetails
  };
};

export default connect(mapStateToProps)(EquityViewFundDetails);
