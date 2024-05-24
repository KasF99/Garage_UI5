using {
    User,
    cuid,
    managed,
    sap.common.CodeList
} from '@sap/cds/common';

namespace sap.garage;

/**
* Cars created by Me.
*/
entity Cars : cuid, managed {
    key ID     : UUID   @(Core.Computed: true);
        Member : Association to Member;
        name   : String @title: 'Title';
        price  : Integer;
        status : Association to Status default 'W';
        image : String
}


/**
* Members created by Me.
*/
entity Member : cuid, managed {
    key ID        : UUID @(Core.Computed: true);
        firstName : String;
        lastName  : String;
        email     : EMailAddress;
        phone     : PhoneNumber;
        Cars      : Association to many Cars
                        on Cars.Member = $self;
}


/**
* Status of car
*/
entity Status : CodeList {
    key code : String enum {
            working     = 'W';
            not_working = 'NW';
            in_repair   = 'IR';
        };
}


type EMailAddress : String;
type PhoneNumber  : String;
