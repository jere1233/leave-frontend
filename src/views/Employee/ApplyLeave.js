import React, { useState } from 'react'
import { 
  CButton, 
  CHeader, 
  CHeaderBrand, 
  CCard, 
  CCardBody, 
  CCardHeader,
  CContainer,
  CRow,
  CCol
} from '@coreui/react'
import ApplyLeaveFormModal from '../leave/ApplyLeaveFormModal'
import LeaveHistory from '../Employee/LeaveHistory'
import LeaveStatsCards from '../leave/LeaveCards'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ApplyLeave = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />

      {/* App Header */}
      <CHeader className="bg-primary text-white shadow-sm fixed-top">
        <CHeaderBrand className="ms-3">
          <h2 className="m-0 text-white">Leave Management</h2>
        </CHeaderBrand>
      </CHeader>

      {/* Main Content */}
      <div className="min-vh-100 bg-gradient-primary pt-5">
        <CContainer fluid className="pt-4">
          
          {/* Stats Cards */}
          <div className="mb-4">
            <LeaveStatsCards />
          </div>

          {/* Apply Leave Card */}
          <div className="mb-4">
            <CCard className="border-0 shadow-lg bg-gradient-info text-white overflow-hidden">
              <CCardBody className="p-4 position-relative">
                
                {/* Decorative Elements */}
                <div className="position-absolute top-0 end-0 bg-white bg-opacity-10 rounded-circle" 
                     style={{ width: '100px', height: '100px', marginTop: '-20px', marginRight: '-20px' }}></div>
                <div className="position-absolute bottom-0 start-0 bg-white bg-opacity-10 rounded-circle" 
                     style={{ width: '80px', height: '80px', marginBottom: '-30px', marginLeft: '-30px' }}></div>

                <CRow className="position-relative">
                  <CCol md={3} className="text-center mb-4 mb-md-0">
                    {/* Icon */}
                    <div className="bg-white bg-opacity-20 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                         style={{ width: '80px', height: '80px' }}>
                      <i className="fas fa-calendar-alt fa-2x"></i>
                    </div>
                    <h4 className="fw-bold mb-2">Request Time Off</h4>
                    <p className="small opacity-75">Quick & Easy Process</p>
                  </CCol>

                  <CCol md={6} className="mb-4 mb-md-0">
                    <h5 className="fw-bold mb-3">Why Apply Through Our System?</h5>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-check-circle me-2"></i>
                      <span className="small">Quick and easy application process</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-check-circle me-2"></i>
                      <span className="small">Real-time approval tracking</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle me-2"></i>
                      <span className="small">Instant notifications and updates</span>
                    </div>
                  </CCol>

                  <CCol md={3} className="d-flex align-items-end">
                    <CButton
                      color="light"
                      size="lg"
                      onClick={() => setModalVisible(true)}
                      className="w-100 fw-bold text-primary shadow"
                    >
                      <i className="fas fa-file-alt me-2"></i>
                      Apply for Leave
                    </CButton>
                  </CCol>
                </CRow>

              </CCardBody>
            </CCard>
          </div>

          {/* Leave History */}
          <div className="mb-4">
            <LeaveHistory />
          </div>

        </CContainer>
      </div>

      {/* Leave Modal */}
      <ApplyLeaveFormModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* Custom CSS for gradients and animations */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #ff4e50, #f9d423, #6a11cb) !important;
          background-size: 180% 180% !important;
          animation: gradientMove 10s ease infinite !important;
        }
        
        .bg-gradient-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .min-vh-100 {
          min-height: 100vh !important;
        }
      `}</style>
    </>
  )
}

export default ApplyLeave