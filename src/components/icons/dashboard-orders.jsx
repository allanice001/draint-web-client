import * as React from "react"

function DashboardOrders(props) {
  return (
    <svg
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.027.506A1.016 1.016 0 0012.15 0H8.387v4.452h6.922L13.027.506zM7.33 0h-3.8c-.36 0-.697.194-.877.507L.379 4.452h6.95V0zM0 5.507V16.76C0 17.444.557 18 1.24 18h13.195c.684 0 1.24-.556 1.24-1.24V5.507H0zm10.232 4.732l-2.728 2.729a.526.526 0 01-.746 0l-1.279-1.28a.528.528 0 01.746-.745l.906.906 2.356-2.356a.527.527 0 11.745.746z"
        fill={props.fill || '#3F4041'}
      />
    </svg>
  )
}

export default DashboardOrders
