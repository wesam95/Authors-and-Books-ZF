<?php

class BookController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $books = new Application_Model_DbTable_Books();
        $this->view->book = $books->fetchAll();

        $authers = new Application_Model_DbTable_Authers();
        $this->view->auther = $authers->fetchAll();

    }

    public function addAction()
    {
        $name = $this->getRequest()->getPost('Name');
        $auther = $this->getRequest()->getPost('Auther_ID');
        $books = new Application_Model_DbTable_Books();
        $authers = new Application_Model_DbTable_Authers();
        $books->addBook($name , $auther);
        $id = $books->getAdapter()->lastInsertId();
        $result = $books->getBook($id);
        $autherID = $result['Auther_ID'];
        $result2 = $authers->getAuther($autherID);

        $data='<tr class = "active" id = "' . $result['ID'] . '">'
        .'<td class = "id"> ' . $result ['ID'] .' </td>'
        .'<td class ="name" id="book"> ' . $result ['Name'] . '</td>'
        .'<td class = "auther" data-id= "' . $result2['ID'] . '"> ' . $result2['Name'] . '</td>'
        .'<td>   <button class ="update">update</button></td>'
        .'<td>   <button class = "delete">delete</button></td></tr>' ;
        $this->_helper->json($data);

    }

    public function editAction()
    {
        $id = $this->_getParam('id', 0);
        if ($id > 0) {
        $books = new Application_Model_DbTable_Books();
        $result = $books->getBook($id);
        $this->_helper->json($result); 
        }
    }

    public function saveAction()
    {
        $id = (int)$this->_getParam('id');
        $name = $this->_getParam('Name');
        $auther = $this->_getParam('Auther_ID');
        $books = new Application_Model_DbTable_Books();
        $authers = new Application_Model_DbTable_Authers();
        $books->updateBook($id, $name, $auther);
        $result = $books->getBook($id);
        $autherID = $result['Auther_ID'];
        $result2 = $authers->select()
        ->where('id ='.$autherID.'');
        $query= $authers->fetchAll($result2);
        $row = $query->toArray();
        $finalResult= $result+$row;
        $this->_helper->json($finalResult);
    }

    public function deleteAction()
    {
        $id = $this->_getParam('id');
        $books = new Application_Model_DbTable_Books();
        $result = $books->getBook($id);
        $result2= $books->deleteBook($id);
        $this->_helper->json($result);
    }
    


}









