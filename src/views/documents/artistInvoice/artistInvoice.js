import { Document, Page, Text, View } from '@react-pdf/renderer';

import React from 'react';
import styled from '@react-pdf/styled-components';

const HeaderWrapper = styled.View`
  padding: 35px 30px 0px 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Times-Roman';
`;
const LogoBlock = styled.View`
  display: flex;
  align-items: flex-start;
`;
const Draint = styled.Text`
  font-family: 'Times-Bold';
  font-size: 60px;
`;
const ArtGallery = styled.Text`
  font-size: 60px;
  font-weight: 600;
  top: -20px;
`;
const InvoiceStatusWrapper = styled.View`
  display: flex;
  align-items: flex-end;
  top: 10px;
`;
const Invoice = styled.View`
  font-family: 'Times-Bold';
  font-size: 20px;
`;
const Status = styled.View`
  font-family: 'Times-Bold';
  top: 3px;
`;
const InvoiceNumber = styled.Text`
  font-family: 'Times-Bold';
  font-size: 12px;
  top: 7px;
`;
const InvoiceDate = styled.Text`
  font-family: 'Times-Bold';
  font-size: 12px;
  top: 9px;
`;
const ArtistWorkAddressWrapper = styled.View`
  padding-left: 30px;
  font-family: 'Times-Bold';
  font-size: 13px;
`;

const Costumer = styled.Text`
  padding-bottom: 20px;
`;

const Country = styled.Text`
  padding-bottom: 20px;
`;
const PaymentWrapper = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 0px 0px 30px;
  font-family: 'Times-Bold';
  font-size: 13px;
`;
const PaymentDate = styled.View`
  display: flex;
  width: 15%;
`;
const PaymentArtwork = styled.View`
  display: flex;
  width: 25%;
`;
const PaymentQuantity = styled.View`
  display: flex;
  align-items: center;
  width: 10%;
`;
const PaymentBuyer = styled.View`
  display: flex;
  width: 45%;
`;
const PaymentHeader = styled.Text`
  padding-bottom: 2px;
`;
const PaymentData = styled.Text`
  font-family: 'Times-Roman';
`;
const PaymentDataArtwork = styled.Text`
  font-family: 'Times-Roman';
  width: 100%;
`;
const PurchasePriceWrapper = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
  padding: 30px 10px 15px 0px;
  font-family: 'Times-Bold';
  font-size: 13px;
`;
const PurchasePriceWrapperAfterLine = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px 10px 0px 0px;
  font-family: 'Times-Bold';
  font-size: 13px;
`;
const PurchasePriceHeader = styled.View`
  display: flex;
  align-items: flex-start;
  width: 50%;
`;
const PurchasePriceData = styled.View`
  display: flex;
  align-items: flex-end;
  width: 10%;
`;
const SmallData = styled.Text`
  padding-top: 10px;
  font-size: 9px;
`;
const SlimData = styled.Text`
  font-family: 'Times-Roman';
`;
const FatData = styled.Text`
  font-size: 18px;
`;
const BorderedData = styled.View`
      left: 232px;
      width: 60%
      border-bottomStyle: 'solid';
      border-bottomColor: 'black';
      border-bottomWidth: 0.7px;
`;
const Bordered = styled.View`
  margin-top: 170px;
  width: 95%;
  left: 15px;
  border-bottomstyle: 'solid';
  border-bottomcolor: 'black';
  border-bottomwidth: 0.7px;
`;
const FooterWrapper = styled.View`
  padding: 10px 40px 0px 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Times-Roman';
  font-size: 10px;
`;
const FooterInfo = styled.View`
  width: 20%;
`;
const FooterName = styled.View`
  width: 15%;
`;
const FooterAddress = styled.View`
  width: 25%;
`;
const FooterDraintAddress = styled.View`
  width: 25%;
`;
const FooterData = styled.Text`
  text-align: center;
`;

export class ArtistInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, actualNumber } = this.props;
    const date = new Date(Date.parse(data.order.paid));
    const createDate = data.created
      ? new Date(data.created)
      : new Date(Date.now());
    return (
      <Document>
        <Page>
          <HeaderWrapper>
            <LogoBlock>
              <Draint>DRAINT</Draint>
              <ArtGallery>ArtGallery</ArtGallery>
            </LogoBlock>
            <InvoiceStatusWrapper>
              <Invoice>
                <Text>INVOICE</Text>
              </Invoice>
              <Status>
                <Text>(*Status*)</Text>
              </Status>
              <InvoiceNumber>Invoice Number: {actualNumber}</InvoiceNumber>
              <InvoiceDate>
                Invoice Date:{' '}
                {`${createDate.getDate()}/${createDate.getMonth() +
                  1}/${createDate.getFullYear()}`}
              </InvoiceDate>
            </InvoiceStatusWrapper>
          </HeaderWrapper>
          <ArtistWorkAddressWrapper>
            <View>
              <Costumer>Customer (the artist)</Costumer>
              <Text>
                {data.seller.first_name} {data.seller.last_name}
              </Text>
              <Text>
                {data.location.addressLine2} {data.location.addressLine1}
              </Text>
              <Text>{data.location.zipcode}</Text>
              <Text>{data.location.city}</Text>
              <Country>{data.location.country}</Country>
              <Text>Tax Status of the artist (6 Options)</Text>
              <Text>VAT Number</Text>
              <Text>Local Tax Number (if there is no VAT)</Text>
            </View>
          </ArtistWorkAddressWrapper>
          <PaymentWrapper>
            <PaymentDate>
              <PaymentHeader>Payment Date</PaymentHeader>
              <PaymentData>
                {date.getDay()}/{date.getMonth() + 1}/{date.getFullYear()}
              </PaymentData>
            </PaymentDate>
            <PaymentArtwork>
              <PaymentHeader>Artwork Title</PaymentHeader>
              <PaymentDataArtwork>{data.artwork.title}</PaymentDataArtwork>
            </PaymentArtwork>
            <PaymentQuantity>
              <PaymentHeader>Quantity</PaymentHeader>
              <PaymentData>1</PaymentData>
            </PaymentQuantity>
            <PaymentBuyer>
              <PaymentHeader>Buyer Information</PaymentHeader>
              <PaymentData>{data.order.to_account}</PaymentData>
            </PaymentBuyer>
          </PaymentWrapper>
          <PurchasePriceWrapper>
            <PurchasePriceHeader>
              <Text>Purchase Price without tax</Text>
              <SlimData>- Transaction costs</SlimData>
              <SlimData>- Shipping costs</SlimData>
              <Text>- Draint Receivables</Text>
            </PurchasePriceHeader>
            <PurchasePriceData>
              <Text>{data.order.price}€</Text>
              <SlimData>{data.stripePaymentFees}€</SlimData>
              <SlimData>
                {data.order.shipping_cost ? data.order.shipping_cost : 0}€
              </SlimData>
              <Text>{data.fee}€</Text>
            </PurchasePriceData>
          </PurchasePriceWrapper>
          <BorderedData />
          <PurchasePriceWrapperAfterLine>
            <PurchasePriceHeader>
              <Text>- Your taxable Payout</Text>
            </PurchasePriceHeader>
            <PurchasePriceData>
              <FatData>
                {data.order.price -
                  data.order.price * 0.1 -
                  data.order.shipping_cost * 0.05}
                €
              </FatData>
            </PurchasePriceData>
          </PurchasePriceWrapperAfterLine>
          <PurchasePriceWrapperAfterLine>
            <PurchasePriceHeader>
              <SmallData>
                *Based on your provided tax information* - Taxes Payable at
                local Registery
              </SmallData>
            </PurchasePriceHeader>
            <PurchasePriceData>
              <SmallData>
                {data.tax.rate ? data.order.price * data.tax.rate : 0}€
              </SmallData>
            </PurchasePriceData>
          </PurchasePriceWrapperAfterLine>
          <Bordered />
          <FooterWrapper>
            <FooterDraintAddress>
              <FooterData>
                Draint GmbH Loehrstrasse 87A 56068 Coblenz District Court
                Coblenz Company Registry 24585
              </FooterData>
            </FooterDraintAddress>
            <FooterInfo>
              <FooterData>
                www.draintart.gallery hello@draintart.gallery VAT:DE312100542
              </FooterData>
            </FooterInfo>
            <FooterName>
              <FooterData>Representatives Robin Haas</FooterData>
            </FooterName>
            <FooterAddress>
              <FooterData>
                Sparkasse Koblenz IBAN DE91 5705 0120 0000 2812 04 BIC
                MALADE51KOB
              </FooterData>
            </FooterAddress>
          </FooterWrapper>
        </Page>
      </Document>
    );
  }
}
