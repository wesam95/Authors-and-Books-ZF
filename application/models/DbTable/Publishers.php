<?php

class Application_Model_DbTable_Publishers extends Zend_Db_Table_Abstract
{

    protected $_name = 'publishers';

public function getPublisher($id)
{
	$id = (int)$id;
	$row = $this->fetchRow('id ='.$id);
	if(!$row){
		throw new Exception("Could not find row $id");
	}
	return $row->toArray(); 
}

public function addPublisher($name , $address , $description)
{
	$data = array(
		'Name' => $name,
		'Address' => $address,
		'Description' => $description,
		);
	$this->insert($data);
}

public function updatePublisher($id , $name , $address , $description)
{
	$data = array(
		'Name'=>$name,
		'Address'=>$address,
		'Description'=>$description,
		);
	$this->update($data , 'id ='.(int)$id);
}

public function deletePublisher($id)
{
	$this->delete('id ='.(int)$id);
}

}

