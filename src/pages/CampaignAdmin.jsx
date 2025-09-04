import { useState } from 'react'
import { useSelector } from 'react-redux'
import CampaignForm from '../components/CampaignAdmin/CampaignForm'
import CampaignCard from '../components/CampaignAdmin/CampaignCard'
import CampaignEditModal from '../components/CampaignAdmin/CampaignEditModal'

export default function CampaignAdmin() {
  const { user } = useSelector(state => state.auth)
  const [campaigns, setCampaigns] = useState([])
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleSubmitCampaign = (campaignData) => {
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      status: 'not_active',
      createdDate: new Date().toISOString().split('T')[0]
    }
    setCampaigns(prev => [...prev, newCampaign])
  }

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign)
    setShowEditModal(true)
  }

  const handleSaveEdit = (updatedData) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === editingCampaign.id 
        ? { ...campaign, ...updatedData }
        : campaign
    ))
    setShowEditModal(false)
    setEditingCampaign(null)
  }

  const handleStatusChange = (campaignId, newStatus) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus }
        : campaign
    ))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Campaign Manager
          </h2>
          <div className="text-right">
            <span className="text-sm text-gray-600">Admin:</span>
            <p className="font-semibold text-gray-800">{user?.name || 'Admin User'}</p>
          </div>
        </div>
      </div>

      {/* Campaign Form */}
      <CampaignForm 
        onSubmit={handleSubmitCampaign}
        editingCampaign={null}
      />

      {/* Campaign Details Section */}
      {campaigns.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Campaign Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEditCampaign}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingCampaign && (
        <CampaignEditModal
          campaign={editingCampaign}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditModal(false)
            setEditingCampaign(null)
          }}
        />
      )}
    </div>
  )
}