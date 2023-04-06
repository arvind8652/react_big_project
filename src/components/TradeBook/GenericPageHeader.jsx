import { React } from 'react';
import { Col, Row, Typography, PageHeader, Rate, Avatar, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/pro-regular-svg-icons';
import { palette, theme } from '../../theme';

const { Title } = Typography;
const defaultValue = {
  securityName: 'Alexandra Romus',
  security: 'BDO1928345',
  securityLogo: 'http://10.80.0.97:3000/images/logo-dummy.png',
  assetGroup: 'Equity',
  assetType: 'Stocks',
  rating: 3,
  tranType: 'Buy',
  amount: '$6000',
  units: '100',
  mobile: '+63 98468265802',
  email: 'alxendra@yahoo.com',
  status: 'Order Placed',
  charges: '$40 / Unit',
  securityInitial: 'AB'
};

const GenericPageHeader = ({
  EquityViewProfileBanner = defaultValue,
  onLeftPress = () => { },
  onRightPress = () => { }
}) => {
  const styleSet = {
    container: {
      color: palette.text.banner
    },
    subContainer: {
      color: palette.text.banner,
      align: 'top'
    },
    iconStyle: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    subIconStyle: {
      //color: palette.text.banner,
      //stroke: '#FFFFFF',
      fontSize: '14px'
    },
    eachTag: {
      fontSize: '18px',
      borderRadius: '16px',
      padding: '2px 10px',
      marginBottom: '5px',
      color: '#354081',
      backgroundColor: '#D9DFFF;'
    },
    avatar: {
      color: '#f56a00',
      backgroundColor: '#fde3cf',
      fontSize: '2.5rem'
    }
  };

  return (
    <PageHeader
      style={{
        backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
        marginTop: '-5.5rem',
        borderRadius: '16px'
      }}
      onBack={() => window.history.back()}
      backIcon={
        <FontAwesomeIcon
          icon={faChevronLeft}
          className='opportunityViewTopBarIcons'
        />
      }
      extra={[
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={onLeftPress}
          className='opportunityViewTopBarIcons'
        />,
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={onRightPress}
          className='opportunityViewTopBarIcons'
        />
      ]}
    >
      <Row>
        <Col xxl={3} md={4} style={{ marginLeft: '20px' }}>
          {EquityViewProfileBanner.securityLogo != null ? (
            <Avatar
              style={styleSet.avatar}
              src={`${EquityViewProfileBanner.securityLogo}`}
              size={120}
            ></Avatar>
          ) : (
              <Avatar style={styleSet.avatar} size={120}>
                {EquityViewProfileBanner.profileInitial}
              </Avatar>
            )}
        </Col>
        <Col xxl={6} md={7}>
          <Row>
            <Col>
              <Title level={4} style={{ color: '#FFF', margin: 0 }}>
                {EquityViewProfileBanner.securityName}
              </Title>
              <span
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                {EquityViewProfileBanner.id}
              </span>
              <span
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                {' '}
                |{' '}
              </span>
              <span
                className='opportunityDescriptionText'
                style={styleSet.iconStyle}
              >
                <Rate
                  style={styleSet.subIconStyle}
                  disabled
                  defaultValue={EquityViewProfileBanner.rating}
                />
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Col>
              <Tag style={styleSet.eachTag}>
                {EquityViewProfileBanner.assetGroup}
              </Tag>
            </Col>
            <Col>
              <Tag style={styleSet.eachTag}>
                {EquityViewProfileBanner.assetType}
              </Tag>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col className='gutter-row' span={8}>
              <Row
                gutter={12}
                className='opportunityDetailText'
                style={{ ...theme.container, ...styleSet.container }}
              >
                {EquityViewProfileBanner.tranType}
              </Row>
              <Row
                gutter={16}
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                Transaction Type
              </Row>
            </Col>
            <Col className='gutter-row' span={8}>
              <Row
                gutter={16}
                className='opportunityDetailText'
                style={{ ...theme.container, ...styleSet.container }}
              >
                {EquityViewProfileBanner.currencySymbol === null &&
                  EquityViewProfileBanner.currencySymbol === ''
                  ? EquityViewProfileBanner.currencySymbol +
                  EquityViewProfileBanner.status
                  : EquityViewProfileBanner.status}
              </Row>
              <Row
                gutter={16}
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                Status
              </Row>
            </Col>
            <Col className='gutter-row' span={8}>
              <Row
                gutter={12}
                className='opportunityDetailText'
                style={{ ...theme.container, ...styleSet.container }}
              >
                {EquityViewProfileBanner.amount}
              </Row>
              <Row
                gutter={16}
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                Amount
              </Row>
            </Col>
            <Col className='gutter-row' span={8}>
              <Row
                gutter={16}
                className='opportunityDetailText'
                style={{ ...theme.container, ...styleSet.container }}
              >
                {EquityViewProfileBanner.units}
              </Row>
              <Row
                gutter={16}
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                Quantity
              </Row>
            </Col>
            <Col className='gutter-row' span={8}>
              <Row
                gutter={16}
                className='opportunityDetailText'
                style={{ ...theme.container, ...styleSet.container }}
              >
                {EquityViewProfileBanner.charges}
              </Row>
              <Row
                gutter={16}
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                Charges
              </Row>
            </Col>
            <Col className='gutter-row' span={8}>
              <Row
                gutter={16}
                className='opportunityDetailText'
                style={{ ...theme.container, ...styleSet.container }}
              >
                {EquityViewProfileBanner.currencySymbol}
              </Row>
              <Row
                gutter={16}
                className='opportunityDescriptionText'
                style={styleSet.container}
              >
                Currency Symbol
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageHeader>
  );
};

export default GenericPageHeader;
