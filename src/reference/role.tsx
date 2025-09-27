import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Form from '../form'
import {
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useCreateRoleMutation,
} from '../../../../redux/services/roles_api'
import { IRole } from '../../../../data_types/role'

function RoleDrawer({
  role,
  open,
  handleCloseDrawer,
}: {
  role: IRole
  open: boolean
  handleCloseDrawer: () => void
}) {
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation()
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation()
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation()
  const isSubmitting = isUpdating || isDeleting || isCreating

  const handleCreateRole = async values => {
    const payload = {
      company_role: {
        ...values,
      },
    }
    createRole({ payload })
    handleCloseDrawer()
  }

  const handleUpdateRole = async values => {
    const payload = {
      company_role: {
        ...values,
      },
    }
    await updateRole({ roleId: role.id, payload })
    handleCloseDrawer()
  }

  const handleDeleteRole = async () => {
    await deleteRole({ roleId: role.id })
    handleCloseDrawer()
  }

  return (
    <Dialog open={open} onClose={handleCloseDrawer} fullWidth maxWidth='sm'>
      <DialogTitle>{role ? 'Edit Role' : 'Add Role'}</DialogTitle>
      <DialogContent dividers>
        {role ? (
          <Form
            role={role}
            handleSave={handleUpdateRole}
            handleCloseDrawer={handleCloseDrawer}
            isSubmitting={isSubmitting}
            deleteRole={handleDeleteRole}
          />
        ) : (
          <Form
            handleSave={handleCreateRole}
            handleCloseDrawer={handleCloseDrawer}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RoleDrawer
