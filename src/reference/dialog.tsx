import React, { useState, useEffect, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import {
  Typography,
  Box,
  Button,
  IconButton,
  Tab,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { Close as CloseIcon, Warning } from '@mui/icons-material'
import Form from './form_dialog'
import DialogHeader from './dialog_header'
import Loading from '../../common/loading'
import { useAppDispatch } from '../../redux/hooks'
import EvidenceCompleted from './instances/completed'
import EvidenceAssignments from './instances/assignments'
import InventoryItemRelationships from './relationships'
import { DocumentDialogContext } from './contexts'
import AlertMaintain from '../../common/alert_maintain'
import { useUpdateInventoryItemAndRefetchMutation } from '../../redux/services/inventory_items_api'
import { useHidden } from '../../hooks/useHidden'
import { NEEDS_CONNECT_AND_TASKS } from '../Drawers/inventory_item/utils'
import AlertSaved from '../../common/alert_saved'

const initValues = {
  id: '',
  name: '',
  description: '',
  status: '',
  accountable_role_id: null,
  asset_category: 'cui_assets',
  next_review_at: '',
  live_document: { id: '', body: '' },
  action: { complete_at: '' },
  inventory_category: { id: '', name: '' },
}

export default function DocumentDialog({ isOpen }) {
  const cid = window.current_company_friendly_id
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const itemId = searchParams.get(window.url_params.document)
  const [item, setItem] = useState<any>(initValues)
  const [isArchived, setIsArchived] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [updateInventoryItem] = useUpdateInventoryItemAndRefetchMutation()
  const [discardChangesCallback, setDiscardChangesCallback] = useState<string>()
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false)
  // const [tab, setTab] = React.useState('1');
  const tab = searchParams.get(window.url_params.document_tab) ?? '1'
  const isDepreciated = window.deprecated_categories_ids.includes(item.inventory_category_id)
  const documentTasksIsHidden = useHidden('document_tasks')
  const [showAlertSaved, setShowAlertSaved] = useState(false)
  const itemRef = useRef()
  itemRef.current = item

  // useEffect(() => {
  //   // make sure the unsaved changes status is reset
  //   setHasUnsavedChanges(false);
  //   // check the seachParams and if you have a tab param then set the tab
  //   // const docParam = window.url_params.document;
  //   const tabParamKey = window.url_params.document_tab;
  //   const tabParam = searchParams.get(tabParamKey);
  //   // if (searchParams.has(docParam)) {
  //   if (searchParams.has(tabParamKey) && tab !== tabParam) {
  //     // turn the tab on
  //     // example ?selectedDoc=37826&documentTab=3
  //     setTab(tabParam);
  //     // } else {
  //     // select the first tab if non is selected
  //     // searchParams.set(tabParam, '1');
  //     // setSearchParams(searchParams);
  //   }
  // }, [searchParams, setSearchParams, tab]);

  // useEffect(() => {
  //   setDocumentTemplateTitle(
  //     !item.document_template_title ||
  //       (item.template_body === '' && item.live_document?.body === '')
  //       ? 'None'
  //       : item.document_template_title,
  //   );
  // }, [item]);

  useEffect(() => {
    setLoading(true)
    // setZoomEditor(false);
    // setShowEditor(false);
    setIsArchived(false)
    setItem(initValues)
    async function loadItem() {
      const resp = await axios.get(`/${cid}/inventory_items/${itemId}`)
      const { data } = resp
      setItem(data)
      setLoading(false)
      // setShowEditor(true);
      // setDocumentTemplateTitle(data.document_template_title ?? 'None');
      // if (!data.live_document) {
      //   setOpenTemplatesDialog(true);
      // }
    }
    if (itemId) loadItem()
  }, [cid, itemId])

  const checkHasUnsavedChanges = () => {
    if (hasUnsavedChanges && !showUnsavedChangesDialog) {
      setShowUnsavedChangesDialog(true)
      return false
    }
    setShowUnsavedChangesDialog(false)
    return true
  }

  const handleClose = () => {
    setDiscardChangesCallback('-1')
    if (!checkHasUnsavedChanges()) return false
    searchParams.delete(window.url_params.document)
    searchParams.delete(window.url_params.document_tab)
    searchParams.delete(window.url_params.evidence)
    searchParams.delete(window.url_params.evidence_type)
    searchParams.delete(window.url_params.evidences_index)
    searchParams.set(window.url_params.document_tab, '1')
    setSearchParams(searchParams)
    return true
  }

  const handleUpdate = async (name, newValue) => {
    if (name === 'status' && newValue === 'archived') {
      setIsArchived(true)
    }
    const resp: any = await updateInventoryItem({
      id: itemId,
      inventory_item: {
        [name]: newValue,
      },
    })
    const updatedItem = resp.data
    setItem(updatedItem)
    dispatch({
      type: 'UPDATE_INVENTORY_ITEMS',
      id: updatedItem.id,
      object: updatedItem,
    })
    if (updatedItem.action) {
      dispatch({
        type: 'UPDATE_ACTION',
        payload: { ...updatedItem.action, source: updatedItem },
      })
    }

    // TEMP RTK FIX: MANUALLY UPDATE THE ITEM IN THE CACHE
    // const updateFunc: any = companyApi.util.updateQueryData(
    //   'getInventoryItems',
    //   undefined,
    //   (draftItems) => {
    //     const draft: any = draftItems.find(
    //       (i: IInventoryItem) => i.id === item.id,
    //     );
    //     Object.assign(draft, updatedItem);
    //   },
    // );
    // dispatch(updateFunc);

    // if (updateCallback) {
    //   updateCallback(updatedItem);
    // }
    setShowAlertSaved(true)
    if (updatedItem.status === 'archived') {
      handleClose()
    }
  }

  const handleCloseAlertSaved = () => {
    setShowAlertSaved(false)
  }

  const handleUpdateAction = async (name, newValue) => {
    setItem({ ...item, action: { ...item.action, [name]: newValue } })
    const updatedItem = await updateInventoryItem({
      id: itemId,
      inventory_item: {
        action_attributes: {
          id: item.action?.id,
          text: item.name,
          [name]: newValue,
        },
      },
    }).unwrap()
    setItem(updatedItem)
    dispatch({
      type: 'UPDATE_INVENTORY_ITEMS',
      id: updatedItem.id,
      object: updatedItem,
    })
    dispatch({
      type: 'UPDATE_INVENTORY_ITEMS_ACTIONS',
      id: updatedItem.id,
      object: updatedItem,
    })
  }

  const attachmentsCallback = i => {
    setItem(i)
    // updateCallback(i);
  }

  // const showTemplatesDialog = () => {
  //   setShowEditor(false);
  //   setOpenTemplatesDialog(true);
  // };

  // const templatesDialogCallback = async (data) => {
  //   // const resp = await axios.get(`/${cid}/inventory_items/${itemId}`);
  //   // const { data } = resp;
  //   setOpenTemplatesDialog(false);
  //   setItem(data);
  //   // setOpenEditor(true);
  //   setShowEditor(true);
  //   // if (updateCallback) {
  //   //   updateCallback(data);
  //   // }
  // };

  // const handleCloseTemplatesDialog = () => {
  //   setOpenTemplatesDialog(false);
  //   setShowEditor(true);
  // };

  // async function editorCallback(data) {
  //   // because editor is using a callback
  //   // we use itemRef.current the get current state
  //   // otherwise it will use the previous state
  //   const currentItem: Object = itemRef.current;
  //   const updatedItem = { ...currentItem, live_document: data };
  //   // if the above fails for some reason we should fetch a new version of the item
  //   // const resp = await axios.get(`/${cid}/inventory_items/${itemId}`);
  //   // const updatedItem = resp.data;
  //   setItem(updatedItem);
  //   if (updateCallback) {
  //     updateCallback(updatedItem);
  //   }
  // }

  const setHasUnsavedChangesHandler = (value: boolean) => {
    setHasUnsavedChanges(value)
  }

  // function updateURLParam(param, value) {
  //   const url = new URL(window.location.href);
  //   url.searchParams.set(param, value);
  //   window.history.replaceState({}, '', url);
  // }

  const navigateToTab = newValue => {
    searchParams.delete(window.url_params.evidence)
    searchParams.delete(window.url_params.evidence_type)
    searchParams.set(window.url_params.document_tab, newValue)
    setSearchParams(searchParams)
    // setTab(newValue);
    // updateURLParam(window.url_params.document_tab, newValue);
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setDiscardChangesCallback(newValue)
    if (!checkHasUnsavedChanges()) {
      return
    }
    // setTab(newValue);
    // add to the searchparams the correct document_tab parameter
    // searchParams.set(window.url_params.document_tab, newValue);
    // remove the evidence parameter
    // searchParams.delete(window.url_params.evidence);
    // update the url
    // setSearchParams(searchParams);
    navigateToTab(newValue)
  }

  // useEffect(() => {
  //   const tabParam = searchParams.get(window.url_params.document_tab);
  //   if (tabParam && tab !== tabParam) {
  //     setTab(tabParam);
  //   }
  // }, [tab, searchParams]);

  const discardChanges = () => {
    setHasUnsavedChanges(false)
    setShowUnsavedChangesDialog(false)
    if (discardChangesCallback && parseInt(discardChangesCallback, 10) > 0) {
      handleChangeTab(null, discardChangesCallback)
    } else {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <DocumentDialogContext.Provider
        value={{
          hasUnsavedChanges,
          navigateToTab,
          setHasUnsavedChanges: setHasUnsavedChangesHandler,
          inventoryCategoryName: item.inventory_category_name,
        }}
      >
        <Dialog
          maxWidth='xl'
          fullWidth
          open={isOpen}
          onClose={handleClose}
          disableEnforceFocus
          disableAutoFocus
          style={{ filter: isArchived ? 'grayscale(1)' : 'none' }}
          sx={{ zIndex: 1200 }}
        >
          {loading ? (
            <Loading />
          ) : (
            <Box
              position='relative'
              // bgcolor="grey.100"
              style={{
                opacity: isArchived ? 0.5 : 1,
                overflow: 'hidden',
              }}
            >
              <DialogHeader
                item={item}
                handleUpdate={handleUpdate}
                tab={tab}
                onClose={handleClose}
              />
              <Box position='absolute' top={5} right={5}>
                <IconButton
                  onClick={handleClose}
                  data-id='inventory-item-drawer-close-button'
                  size='small'
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
              </Box>
              {item && !NEEDS_CONNECT_AND_TASKS.includes(item.inventory_category_id) && (
                <Box
                  sx={{
                    borderTop: `1px ${grey[300]} solid`,
                    backgroundColor: 'common.white',
                    overflowY: 'auto',
                    position: 'relative',
                    height: window.innerHeight - window.innerHeight * 0.3,
                  }}
                >
                  <Form
                    attachmentsCallback={attachmentsCallback}
                    item={item}
                    handleUpdate={handleUpdate}
                    handleUpdateAction={handleUpdateAction}
                    navigateToTab={navigateToTab}
                  />
                </Box>
              )}

              {item && NEEDS_CONNECT_AND_TASKS.includes(item.inventory_category_id) && (
                <TabContext value={tab}>
                  <Box
                    sx={{
                      borderTop: 1,
                      borderColor: 'divider',
                      px: 4,
                    }}
                  >
                    <TabList
                      onChange={handleChangeTab}
                      aria-label='dialog tabs'
                      sx={theme => ({
                        '& .MuiTab-root.Mui-selected': {
                          background: 'linear-gradient(to top, transparent, white)',
                          fontWeight: 'bold',
                        },
                        ...theme.applyStyles('dark', {
                          '& .MuiTab-root.Mui-selected': {
                            background: 'linear-gradient(to top, transparent, black)',
                          },
                        }),
                      })}
                    >
                      <Tab label='Overview' value='1' sx={{ px: 4 }} />
                      {!isDepreciated && <Tab label='Connect' value='2' sx={{ px: 4 }} />}
                      {!documentTasksIsHidden && (
                        <Tab
                          label={
                            <Box>
                              Task Assignments
                              <br />
                              <small>(Create Evidence)</small>
                            </Box>
                          }
                          value='3'
                          sx={{ px: 4 }}
                        />
                      )}
                      {!documentTasksIsHidden && <Tab label='Evidence' value='4' sx={{ px: 4 }} />}
                    </TabList>
                  </Box>
                  {tab !== '1' && <AlertMaintain />}
                  <Box
                    sx={{
                      borderTop: 1,
                      borderColor: 'divider',
                      overflowY: 'auto',
                      position: 'relative',
                      height: window.innerHeight - window.innerHeight * 0.3,
                    }}
                  >
                    <TabPanel value='1' sx={{ p: 0 }}>
                      <Form
                        attachmentsCallback={attachmentsCallback}
                        item={item}
                        handleUpdate={handleUpdate}
                        handleUpdateAction={handleUpdateAction}
                        navigateToTab={navigateToTab}
                      />
                    </TabPanel>
                    <TabPanel value='2' sx={{ p: 0, height: '100%' }}>
                      <InventoryItemRelationships item={item} />
                    </TabPanel>
                    <TabPanel value='3' sx={{ p: 0 }}>
                      <EvidenceAssignments item={item} />
                    </TabPanel>
                    <TabPanel value='4' sx={{ p: 0 }}>
                      <EvidenceCompleted item={item} />
                    </TabPanel>
                  </Box>
                </TabContext>
              )}
            </Box>
          )}
        </Dialog>
        <Dialog
          open={showUnsavedChangesDialog}
          onClose={() => setShowUnsavedChangesDialog(false)}
          aria-labelledby='unsaved-chages-warning-dialog-title'
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'warning.main',
            }}
          >
            <Warning sx={{ mr: 1 }} />
            Unsaved Changes
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              py: 3,
            }}
          >
            <Typography variant='body1'>
              <strong>Warning:</strong> You have unsaved changes that will be lost if you leave this
              page. Are you sure you want to exit?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant='text'
              onClick={() => setShowUnsavedChangesDialog(false)}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={discardChanges} sx={{ px: 4 }}>
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </DocumentDialogContext.Provider>
      <AlertSaved open={showAlertSaved} onClose={handleCloseAlertSaved} />
    </>
  )
}
