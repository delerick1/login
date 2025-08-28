import { useState } from 'react'
import CampaignHeader from '../components/CampaignAdmin/CampaignHeader'
import CampaignControls from '../components/CampaignAdmin/CampaignControls'
import CampaignTable from '../components/CampaignAdmin/CampaignTable'
import CampaignModal from '../components/CampaignAdmin/CampaignModal'

export default function CampaignAdmin() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Customer Support Q1',
      description: 'Primary customer support campaign for Q1 2024',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'active',
      teamSize: 15,
      supervisor: 'Sarah Johnson',
      department: 'Support',
      budget: 50000,
      createdDate: '2023-12-15'
    },
    {
      id: 2,
      name: 'Sales Team Alpha',
      description: 'Outbound sales campaign targeting enterprise clients',
      startDate: '2024-02-01',
      endDate: '2024-06-30',
      status: 'active',
      teamSize: 8,
      supervisor: 'Michael Brown',
      department: 'Sales',
      budget: 75000,
      createdDate: '2024-01-20'
    },
    {
      id: 3,
      name: 'Technical Support',
      description: 'Technical assistance and troubleshooting support',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      status: 'active',
      teamSize: 12,
      supervisor: 'Jennifer Davis',
      department: 'Technical',
      budget: 60000,
      createdDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Quality Assurance',
      description: 'Quality monitoring and training campaign',
      startDate: '2023-10-01',
      endDate: '2024-09-30',
      status: 'completed',
      teamSize: 5,
      supervisor: 'Robert Wilson',
      department: 'QA',
      budget: 30000,
      createdDate: '2023-09-15'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)

  const [supervisors] = useState([
    'Sarah Johnson',
    'Michael Brown',
    'Jennifer Davis',
    'Robert Wilson',
    'Admin'
  ])

  const [departments] = useState([
    'Support',
    'Sales',
    'Technical',
    'QA',
    'Training',
    'Management'
  ])

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(campaign => 
        campaign.name.toLowerCase().includes(term) ||
        campaign.description.toLowerCase().includes(term) ||
        campaign.supervisor.toLowerCase().includes(term) ||
        campaign.department.toLowerCase().includes(term)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === statusFilter)
    }

    return filtered
  }, [campaigns, searchTerm, statusFilter])

  const handleAddCampaign = () => {
    setEditingCampaign(null)
    setShowModal(true)
  }

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign)
    setShowModal(true)
  }

  const handleSaveCampaign = (campaignData) => {
    if (editingCampaign) {
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === editingCampaign.id ? { ...campaignData, id: editingCampaign.id } : campaign
      ))
    } else {
      const newCampaign = {
        ...campaignData,
        id: Math.max(...campaigns.map(c => c.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0]
      }
      setCampaigns(prev => [...prev, newCampaign])
    }
    setShowModal(false)
    setEditingCampaign(null)
  }

  const handleDeleteCampaign = (campaignId) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId))
    }
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <CampaignHeader />

        <CampaignControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddCampaign={handleAddCampaign}
        />

        <CampaignTable
          campaigns={filteredCampaigns}
          onEditCampaign={handleEditCampaign}
          onDeleteCampaign={handleDeleteCampaign}
        />

        {/* Campaign Modal */}
        {showModal && (
          <CampaignModal
            campaign={editingCampaign}
            supervisors={supervisors}
            departments={departments}
            onSave={handleSaveCampaign}
            onClose={() => {
              setShowModal(false)
              setEditingCampaign(null)
            }}
          />
        )}
      </div>
    </div>
  )
}