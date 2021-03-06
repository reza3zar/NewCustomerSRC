 

// let basUrl='https://sso.ime.co.ir/';
//  export const AppUrl = {

//     'logIn':basUrl+'api/Account/Login',
//     'logOut':basUrl+'api/Account/Logout',
//     'captchaKey':basUrl+'api/captcha-key?',
//     'captchaImg':basUrl+'api/captcha-data?key=',
// }; 

//  let basUrl='http://172.16.56.77:10100/api';
let basUrl='https://customerapp.ime.co.ir:10100/api';

export const AppUrl = {
  'products': '/api/products', 
  'thumbnails': '/api/thumbnails',
  'categories': basUrl+'/ComponentModel',
  'wishlist': '/api/wishlist',
  'shoppingCart': '/api/shoppingCart',
  'states': '/api/states',
  'taxes': '/api/taxes',
  'users': '/api/users',
  'usersInfo': '/api/usersInfo',
  'brands':'/api/brands',
  'customers':basUrl+'/common/customer',
  'credit':basUrl+'/credit',
  'broker':basUrl+'/common/broker',
  'categoryCredit':basUrl+'/credit-category',


  'bank':basUrl+'/common/banks',
  'bankAccountTypes':basUrl+'/common/bankAccountTypes',
  'Cities': basUrl+'/common/Cities',
  'Countries': basUrl+'/common/Countries',
  'Educations': basUrl+'/common/Educationdegrees',
  'States': basUrl+'/common/States',
  'Genders': basUrl+'/common/Genders',
  'login':basUrl+'/account',
   'customerType':basUrl+'/common/customerTypes',
   'addressType':basUrl+'/common/addressTypes',
   'brokerRequests':basUrl+'/broker/requests',
   'identityType':basUrl+'/common/identityTypes',
    'inquiryTaxpaer':basUrl+'/Inquiries/TaxPayerInfo/meta/',
    'inquirylegalInfo':basUrl+'/inquiries/legalPersoninfo/meta/',
    'inquiryDepository':basUrl+'/inquiries/depositoryinfo/meta/',
    'inquiryfidaLegalPerson':basUrl+'/Inquiries/ForeignersInfo/LegalPerson/meta/',
    'inquiryfidanaturalPerson':basUrl+'/Inquiries/ForeignersInfo/NaturalPerson/meta/',
    'verifyCellInfoIndividualPerson':basUrl+'/Inquiries/VerifyCellInfo/IndividualPerson/meta/',
    'verifyCellInfoLegalPerson':basUrl+'/Inquiries/VerifyCellInfo/LegalPerson/meta/',
     'legalTypes':basUrl+'/common/FirmTypes',
     'directorateAuthoritiesTypes':basUrl+'/common/DirectorateAuthorities',
     'freeZones':basUrl+'/common/FreeZones',
     'measurementUnits':basUrl+'/common/MeasurementUnits',
     'positions':basUrl+'/common/Positions',
     'zonesOfActivity':basUrl+'/common/ZoneOfActivities',
    'chekIsExistExternalId':basUrl+'/exchange/customers/exists',
    'inquiryDepositoryByNationalID':basUrl+'/Inquiries/Warehouseinfo/meta/',
    'behinyabinfo':basUrl+'/Inquiries/behinyabinfo/meta/',
    'customerInfo':basUrl+'/Inquiries/tsetmc/customerinfo/meta/',
    'requestsOfBrokers':basUrl+'/exchange/Requests/Theirs/brief',
    'responseStatus':basUrl+'/common/ResponseStatuses',
    'acceptRequest':basUrl+'/exchange/Requests/Theirs/accept/',
    'rejectRequest':basUrl+'/exchange/Requests/Theirs/reject/',
    'supervisorRequests':basUrl+'/exchange/Responses/Theirs/brief',
    'supervisorAcceptRequest':basUrl+'/exchange/Responses/Theirs/finalize/',
    'supervisorRejectRequest':basUrl+'/exchange/Responses/Theirs/delete/',
    'supervisorRejectAltogether':basUrl+'/exchange/Responses/Theirs/rejectaltogether/',
    'supervisorRejectToBroker':basUrl+'/exchange/Responses/Theirs/rejecttobroker/',
    'supervisorReassessment':basUrl+'/exchange/Responses/Theirs/rejecttoclerk/',
    'switchResponseRequestStatusByClerk':basUrl+'/exchange/Requests/Theirs/switch/',
    'switchResponseRequestStatusBySupervisor':basUrl+'/exchange/Responses/Theirs/switch/',
    'historyOfrejectRequest':basUrl+'/exchange/Reports/History/RejectResponses/',
    'getIndividualInteriorBrokerRequest':basUrl+'/exchange/Requests/Theirs/Individual/Interior/',
    'getLegalInteriorBrokerRequest':basUrl+'/exchange/Requests/Theirs/Legal/Interior/',
    'getPublicBrokerRequestExchangeSide':basUrl+'/exchange/Requests/Theirs/public/',
    'EvidenceCategories':basUrl+'/common/EvidenceCategories/',
    'SharedEvidenceNodes':basUrl+'/Common/SharedEvidence/',
    'MarketEvidenceNodes':basUrl+'/Common/MarketEvidence/',
    'StatusOfEvidenceOfAttorney':basUrl+'/broker/AttorneyRequests/Evidences/',
    'StatusOfEvidenceOfAttorneyExchangeSide':basUrl+'/exchange/AttorneyRequests/Evidences/',
    'StatusOfEvidenceOfFinalAttorneyBrokerSide':basUrl+'/broker/Attorneys/Evidences/',
    'StatusOfEvidenceOfFinalAttorneyExchangeSide':basUrl+'/exchange/Attorneys/Evidences/',
    'StatusOfEvidenceOfLegalInterior':basUrl+'/broker/Requests/Legal/Interior/Evidences/',
    'StatusOfEvidenceOfLegalInteriorExchangeSide':basUrl+'/exchange/requests/legal/interior/evidences/',
    'StatusOfEvidenceOfIndividualInterior':basUrl+'/broker/requests/individual/interior/evidences/',
    'StatusOfEvidenceOfIndividualInteriorExchangeSide':basUrl+'/exchange/requests/individual/interior/evidences/',
    'StatusOfEvidenceOfPublic':basUrl+'/broker/requests/public/evidences/',
    'StatusOfEvidenceOfPublicExchangeSide':basUrl+'/exchange/requests/public/evidences/',
    'TokenForUploadEvidenceOfLegalInteriorRequest':basUrl+'/broker/Requests/Legal/Interior/Evidences/Subscribe/',
    'TokenForUploadEvidenceOfLegalInteriorRequestExchangeSide':basUrl+'/exchange/Requests/Legal/Interior/Evidences/Subscribe/',
    'TokenForUploadEvicdenceOfPublicRequest':basUrl+'/broker/requests/public/Evidences/Subscribe/',
    'TokenForUploadEvicdenceOfPublicRequestExchangeSide':basUrl+'/exchange/requests/public/Evidences/Subscribe/',
    'TokenForUploadEvidenceOfIndividualInteriorRequest':basUrl+'/broker/Requests/Individual/Interior/Evidences/Subscribe/',
    'TokenForUploadEvidenceOfIndividualInteriorRequestExchangeSide':basUrl+'/exchange/Requests/Individual/Interior/Evidences/Subscribe/',
    'TokenForUploadEvidenceOfAttorneyRequest':basUrl+'/broker/AttorneyRequests/Evidences/Subscribe/',
    'uploadFileOfEvidence':basUrl+'/File/Brokers/Upload',
    'finalizeLegalEvicdence': basUrl+'/broker/Requests/Legal/Interior/Evidences/Submit',
    'finalizePublicEvicdence':basUrl+'/broker/Requests/Public/Evidences/Submit',
    'finalizeAttorneyEvicdence': basUrl+'/broker/AttorneyRequests/Evidences/Submit',
    'finalizeIndividualEvicdence':basUrl+'/broker/Requests/Individual/Interior/Evidences/Submit',
    'downloadUploadedDocument':basUrl+'/File/Brokers/Download',
    'downloadUploadedDocumentExchangeSide':basUrl+'/File/Exchanges/Download',
    'downloadAllUploadedDocument':basUrl+'/File/Exchanges/DownloadAll',
    'allCustomers':basUrl+'/exchange/Customers/brief/',
    'allCustomerReadytoMigration':basUrl+'/exchange/Customers/openbrief/',
    'migrateToOldSystems':basUrl+'/exchange/Customers/transfer/',
    'attorneyRequests':basUrl+'/broker/attorneyRequests/brief/',
    'chekIsExistClintInCustomersOfRequest':basUrl+'/broker/AttorneyRequests/Add/customer/Inquiry/',
    'allAttorneyTypes':basUrl+'/common/attorneyContractStatuses',
    'addAttorney':basUrl+'/broker/AttorneyRequests/Add/create',
    'updateAttorneyRequest':basUrl+'/broker/AttorneyRequests/add/update/',
    'deleteAttorneyRequest':basUrl+'/broker/AttorneyRequests/add/delete/',
    'sendAttorneyRequest':basUrl+'/broker/AttorneyRequests/add/finalize/',
    'getAttorneyRequest':basUrl+'/broker/AttorneyRequests/get',
    'keyOfAttorneyForExportPdf':basUrl+'/broker/AttorneyRequests/publish/',
    'getPdfOfAttorneyByKey':basUrl+'/Reports/AttorneyRequestForm/printPdf',
    'getAttorneyRequestById':basUrl+'/broker/AttorneyRequests/add/GetById/',
    'getAttorneyRequestsOfLegalUnit':basUrl+'/exchange/legal/clerk/AttorneyRequests/brief',
    'getAttorneyRequestByIdLegalUnit':basUrl+'/exchange/legal/clerk/AttorneyRequests/',
    'updateResponseIfAttorneyRequestsByLegalUnit':basUrl+'/exchange/legal/clerk/AttorneyRequests/Switch/',
    'acceptAttorneyRequestsByLegalUnit':basUrl+'/exchange/legal/clerk/AttorneyRequests/accept/',
    'rejectAttorneyRequestsByLegalUnit':basUrl+'/exchange/legal/clerk/AttorneyRequests/reject/',
    'getWitnessesAttorneyRequests':basUrl+'/exchange/legal/clerk/AttorneyRequests/witnesses/',

    'getAttorneyRequestByIdSuperviosrSide':basUrl+'/exchange/spot/supervisor/AttorneyRequests/',
    'getAttorneyRequestsOfSupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/brief',
    'finalizeAttorneyRequestsBySupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/finalize/',
    'rejectAltogetherAttorneyRequestsBySupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/rejectaltogether/',
    'rejectToBrokerAttorneyRequestsBySupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/rejecttobroker/',
    'rejectToClerkAttorneyRequestsBySupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/rejecttoclerk/',
    'updateResponseIfAttorneyRequestsBySupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/switch/',
    'getAttorneyRequestByIdSupervisor':basUrl+'/exchange/spot/supervisor/AttorneyRequests/',
    'getFinalAttorneysOfBroker':basUrl+'/broker/Attorneys/brief',
    'getFinalAttorneysOfExchange':basUrl+'/exchange/Attorneys/brief',
    'getAttorneyByIdExchangeSide':basUrl+'/exchange/Attorneys/GetById/',
    'getAttorneyByIdBrokerSide':basUrl+'/broker/Attorneys/GetById/'

    


};

