<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $books = new Application_Model_DbTable_Books();
        $select = $books->select()
        ->order('id DESC')
        ->limit('3');
        $this->view->book = $books->fetchAll($select);




    }



}



