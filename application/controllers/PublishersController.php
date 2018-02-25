<?php

class PublishersController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function dataAction()
    {
        $publishers = new Application_Model_DbTable_Publishers();
        $res = $publishers->fetchAll();
        $this->_helper->json(array(
            "data"=> $res->toArray()
            ));         
    }

    public function addAction()
    {
        $name = $this->getRequest()->getPost('Name');
        $address = $this->getRequest()->getPost('Address');
        $description = $this->getRequest()->getPost('Description');
        $publishers = new Application_Model_DbTable_Publishers();
        $publishers->addPublisher($name , $address , $description);
        $id = $authers->getAdapter()->lastInsertId();
        $result = $authers->getPublisher($id);
        $data = '<tr class = "active" id = "'.  $result['ID']. '">'
        .'<td class = "id">'.   $result ['ID'] .'</td>'
        .'<td class ="name">'.  $result ['Name'] .'</td>'
        .'<td class = "address">'.  $result ['Address'] .'</td>'
        .'<td class = "description">'.$result ['Description'].'</td>'
        .'<td>   <button class = "update">Update </button></td>'
        .'<td>   <button class = "delete">delete</button></td></tr>';
        $this->_helper->json($data);

    }

    public function editAction()
    {
        $id = $this->_getParam('id', 0);
        if ($id > 0) {
        $publishers = new Application_Model_DbTable_Publishers();
        $result = $publishers->getPublisher($id);
        $this->_helper->json($result);
        }
    }

    public function saveAction()
    {
        $id = (int)$this->_getParam('id');
        $name = $this->_getParam('Name');
        $address = $this->_getParam('Address');
        $description = $this->_getParam('Description');
        $publishers = new Application_Model_DbTable_Publishers();
        $publishers->updatePublisher($id, $name, $address , $description);
        $result = $publishers->getPublisher($id);
        $this->_helper->json($result);
    }

    public function deleteAction()
    {
        $id = $this->_getParam('id');
        $publishers = new Application_Model_DbTable_Publishers();
        $result = $publishers->getPublisher($id);
        $result2= $publishers->deletePublisher($id);
        $this->_helper->json($result);
    }


}









