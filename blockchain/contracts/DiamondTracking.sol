// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

contract DiamondTracking{
    struct Sender{
        address from ;
        string location;
    }
    struct Diamond{
        string id;
        uint256 size;
        uint256 weight;
    }

    Sender senderInfo;

    Diamond[] public allDiamonds;

    function setValues (uint256 _size,string memory _id,uint256 _weight)public{
        Diamond memory diamond=Diamond({id:_id,size:_size,weight:_weight});
        allDiamonds.push(diamond);
    }
    function setSenderValues(string memory _location)public{
        senderInfo=Sender({location:_location,from:msg.sender});

    }

    function showSender()public view returns(Sender memory){
        return senderInfo;

    }

    




    
}