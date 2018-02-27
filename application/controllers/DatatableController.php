<?php

class DataTableController extends Zend_Controller_Action
{

    public function init()
    {
        
    }

    public function indexAction()
    {
          
    }

    public function dataAction()
    {
        $authers = new Application_Model_DbTable_Authers();
        $res = $authers->fetchAll();
        $this->_helper->json(array(
            "data"=> $res->toArray()
            ));     
    }

    public function addAction()
    {
        $name = $this->getRequest()->getPost('Name');
        $email = $this->getRequest()->getPost('E_mail');
        $authers = new Application_Model_DbTable_Authers();
        $authers->addAuther($name , $email);
        $id = $authers->getAdapter()->lastInsertId();
        $result = $authers->getAuther($id);
        $actions = '';
        if ($result ['Actions'] == null)
        $actions = 'null';  
        else 
        $actions = $result ['Actions'];
        $data = '<tr class = "active" id = "'.  $result['ID']. '">'
        .'<td class = "id">'.   $result ['ID'] .'</td>'
        .'<td class ="name" id="auther">'.  $result ['Name'] .'</td>'
        .'<td class = "email">'.  $result ['E_mail'] .'</td>'
        .'<td>'.$actions.'</td>'
        .'<td>   <button id = "editDataTable" role= "button" data-toggle= "modal" data-target= "#updateForm">Update </button></td>'
        .'<td>   <button id = "deleteDataTable" role= "button" data-toggle= "modal" data-target= "#deleteForm">delete</button></td></tr>';
        $this->_helper->json($data);

    }

    public function editAction()
    {
        $id = $this->_getParam('id', 0);
        if ($id > 0) {
        $authers = new Application_Model_DbTable_Authers();
        $result = $authers->getAuther($id);
        $this->_helper->json($result);
        }
    }

    public function saveAction()
    {
        $id = (int)$this->_getParam('id');
        $name = $this->_getParam('Name');
        $email = $this->_getParam('E_mail');
        $authers = new Application_Model_DbTable_Authers();
        $authers->updateAuther($id, $name, $email);
        $result = $authers->getAuther($id);
        $this->_helper->json($result);
    }

    public function deleteAction()
    {
        $id = $this->_getParam('id');
        $authers = new Application_Model_DbTable_Authers();
        $result = $authers->getAuther($id);
        $this->_helper->json($result);
    }

    public function removeAction()
    {
        $id= $this->_getParam('id');
        $authers = new Application_Model_DbTable_Authers();
        $result= $authers->getAuther($id);
        $result2= $authers->deleteAuther($id);
        $this->_helper->json($result);        

    }

}









