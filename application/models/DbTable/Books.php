<?php

class Application_Model_DbTable_Books extends Zend_Db_Table_Abstract
{

    protected $_name = 'book';

public function getBook($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('id ='.$id);
	if(!$row){
		throw new Exception("Could not find row $id");
	}
	return $row->toArray(); 
}

public function addBook($name , $autherID)
{
	$data = array(
		'Name' => $name,
		'Auther_ID' => $autherID,
		);
	$this->insert($data);
}

public function updateBook($id , $name , $autherID)
{
	$data = array(
		'Name'=>$name,
		'Auther_ID'=>$autherID,
		);
	$this->update($data , 'id ='.(int)$id);
}

public function deleteBook($id)
{
	$this->delete('id ='.(int)$id);
}

}

