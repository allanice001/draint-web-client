import React from 'react';

export default function CodeQR({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 26 26"
      className={className}
    >
      <g>
        <path
          d="M26 15.9962V18.8907C26 19.4517 25.5453 19.9063 24.9844 19.9063H22.1406C21.5797
        19.9063 21.125 19.4517 21.125 18.8907C21.125 18.3297 21.5797 17.8751 22.1406 17.8751H23.9688V15.9962C23.9688
        15.4352 24.4234 14.9805 24.9844 14.9805C25.5453 14.9805 26 15.4352 26 15.9962ZM11.9844 11.0196C12.5453 11.0196
        13 10.5649 13 10.004V7.71881H14.0156C14.5766 7.71881 15.0312 7.26416 15.0312 6.70318V1.01568C15.0312 0.44241
        14.5564 -0.0197792 13.9785 0.000652287C13.4283 0.0202904 13 0.489223 13 1.04008V1.82818H11.9844C11.4234
        1.82818 10.9688 2.28283 10.9688 2.84381C10.9688 3.40478 11.4234 3.85943 11.9844
        3.85943H13V5.68756H11.9844C11.4234 5.68756 10.9688 6.14221 10.9688 6.70318V10.004C10.9688 10.5649
        11.4234 11.0196 11.9844 11.0196ZM1.01562 14.9805C1.5766 14.9805 2.03125 14.5259 2.03125
        13.9649V12.9493H3.09766C3.65863 12.9493 4.11328 12.4946 4.11328 11.9337C4.11328 11.3727
        3.65863 10.918 3.09766 10.918H1.01562C0.454651 10.918 0 11.3727 0 11.9337V13.9649C0 14.5259
        0.454651 14.9805 1.01562 14.9805ZM16.0469 12.9493H18.7891V15.9718C18.7891 16.5226 19.2173
        16.9915 19.7676 17.0112C20.3454 17.0316 20.8203 16.5694 20.8203 15.9962V14.9805H21.8867C22.4477
        14.9805 22.9023 14.5259 22.9023 13.9649C22.9023 13.4039 22.4477 12.9493 21.8867
        12.9493H20.8203V11.9337C20.8203 11.3727 20.3657 10.918 19.8047 10.918H16.0469C15.4859
        10.918 15.0312 11.3727 15.0312 11.9337C15.0312 12.4946 15.4859 12.9493 16.0469 12.9493ZM24.9844
        10.918C24.4234 10.918 23.9688 11.3727 23.9688 11.9337C23.9688 12.4946 24.4234 12.9493 24.9844
        12.9493C25.5453 12.9493 26 12.4946 26 11.9337C26 11.3727 25.5453 10.918 24.9844 10.918ZM16.0469
        14.9805C15.4859 14.9805 15.0312 15.4352 15.0312 15.9962V17.8751H14.5234C13.9625 17.8751 13.5078
        18.3297 13.5078 18.8907C13.5078 19.4517 13.9625 19.9063 14.5234 19.9063H16.0469C16.6078 19.9063
        17.0625 19.4517 17.0625 18.8907V15.9962C17.0625 15.4352 16.6078 14.9805 16.0469 14.9805ZM16.0469
        23.9688H15.0312V22.9532C15.0312 22.3922 14.5766 21.9376 14.0156 21.9376H13V20.9219C13 20.361
        12.5453 19.9063 11.9844 19.9063C11.4234 19.9063 10.9688 20.361 10.9688 20.9219V22.9532C10.9688
        23.5142 11.4234 23.9688 11.9844 23.9688H13V24.9844C13 25.5454 13.4547 26.0001
        14.0156 26.0001H16.0469C16.6078 26.0001 17.0625 25.5454 17.0625 24.9844C17.0625
        24.4235 16.6078 23.9688 16.0469 23.9688ZM20.1094 21.9376C20.1094 21.3766 19.6547 20.9219
        19.0938 20.9219H18.5859C18.025 20.9219 17.5703 21.3766 17.5703 21.9376C17.5703 22.4985
        18.025 22.9532 18.5859 22.9532H19.0938C19.6547 22.9532 20.1094 22.4985 20.1094 21.9376ZM24.9844
        23.9688H24.1719V22.9532C24.1719 22.3922 23.7172 21.9376 23.1562 21.9376C22.5953 21.9376 22.1406
        22.3922 22.1406 22.9532V23.9688H20.1094C19.5484 23.9688 19.0938 24.4235 19.0938 24.9844C19.0938
        25.5454 19.5484 26.0001 20.1094 26.0001H24.9844C25.5453 26.0001 26 25.5454 26 24.9844C26 24.4235
        25.5453 23.9688 24.9844 23.9688ZM11.9844 16.8594C12.5453 16.8594 13 16.4048 13 15.8438V13.9649C13
        13.4039 12.5453 12.9493 11.9844 12.9493H8.32812V11.9581C8.32812 11.4072 7.89986 10.9383 7.34959
        10.9186C6.77176 10.8982 6.29688 11.3604 6.29688 11.9337V12.9493H5.78906C5.22809 12.9493 4.77344
        13.4039 4.77344 13.9649C4.77344 14.5259 5.22809 14.9805 5.78906 14.9805H10.9688V15.8438C10.9688
        16.4048 11.4234 16.8594 11.9844 16.8594ZM0 6.09381V3.04693C0 1.36679 1.36673 5.71919e-05 3.04688
        5.71919e-05H6.09375C7.7739 5.71919e-05 9.14062 1.36679 9.14062 3.04693V6.09381C9.14062 7.77395
        7.7739 9.14068 6.09375 9.14068H3.04688C1.36673 9.14068 0 7.77395 0 6.09381ZM2.03125 6.09381C2.03125
        6.65379 2.48689 7.10943 3.04688 7.10943H6.09375C6.65373 7.10943 7.10938 6.65379 7.10938
        6.09381V3.04693C7.10938 2.48695 6.65373 2.03131 6.09375 2.03131H3.04688C2.48689 2.03131 2.03125
        2.48695 2.03125 3.04693V6.09381ZM4.57031 5.586C5.13129 5.586 5.58594 5.13134 5.58594 4.57037C5.58594
        4.0094 5.13129 3.55475 4.57031 3.55475C4.00934 3.55475 3.55469 4.0094 3.55469 4.57037C3.55469 5.13134
        4.00934 5.586 4.57031 5.586ZM26 3.04693V6.09381C26 7.77395 24.6333 9.14068 22.9531 9.14068H19.9062C18.2261
        9.14068 16.8594 7.77395 16.8594 6.09381V3.04693C16.8594 1.36679 18.2261 5.71919e-05 19.9062
        5.71919e-05H22.9531C24.6333 5.71919e-05 26 1.36679 26 3.04693ZM23.9688 3.04693C23.9688
        2.48695 23.5131 2.03131 22.9531 2.03131H19.9062C19.3463 2.03131 18.8906 2.48695 18.8906
        3.04693V6.09381C18.8906 6.65379 19.3463 7.10943 19.9062 7.10943H22.9531C23.5131 7.10943
        23.9688 6.65379 23.9688 6.09381V3.04693ZM21.4297 3.55475C20.8687 3.55475 20.4141 4.0094
        20.4141 4.57037C20.4141 5.13134 20.8687 5.586 21.4297 5.586C21.9907 5.586 22.4453 5.13134
        22.4453 4.57037C22.4453 4.0094 21.9907 3.55475 21.4297 3.55475ZM9.14062 19.9063V22.9532C9.14062
        24.6333 7.7739 26.0001 6.09375 26.0001H3.04688C1.36673 26.0001 0 24.6333 0 22.9532V19.9063C0 18.2262
        1.36673 16.8594 3.04688 16.8594H6.09375C7.7739 16.8594 9.14062 18.2262 9.14062 19.9063ZM7.10938
        19.9063C7.10938 19.3463 6.65373 18.8907 6.09375 18.8907H3.04688C2.48689 18.8907 2.03125 19.3463
        2.03125 19.9063V22.9532C2.03125 23.5132 2.48689 23.9688 3.04688 23.9688H6.09375C6.65373 23.9688
        7.10938 23.5132 7.10938 22.9532V19.9063ZM4.57031 20.4141C4.00934 20.4141 3.55469 20.8688 3.55469
        21.4297C3.55469 21.9907 4.00934 22.4454 4.57031 22.4454C5.13129 22.4454 5.58594 21.9907 5.58594
        21.4297C5.58594 20.8688 5.13129 20.4141 4.57031 20.4141Z"
          fill="#3F4041"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
