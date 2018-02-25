<?php

class Application_Model_DbTable_Authers extends Zend_Db_Table_Abstract
{

    protected $_name = 'users';

public function getAuther($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('id ='.$id);
	if(!$row){
		throw new Exception("Could not find row $id");
	}
	return $row->toArray(); 
}

public function addAuther($name , $email)
{
	$data = array(
		'Name' => $name,
		'E_mail' => $email,
		);
	$this->insert($data);
}

public function updateAuther($id , $name , $email)
{
	$data = array(
		'Name'=>$name,
		'E_mail'=>$email,
		);
	$this->update($data , 'id ='.(int)$id);
}

public function deleteAuther($id)
{
	$this->delete('id ='.(int)$id);
}

}

