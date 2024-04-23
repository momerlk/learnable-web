#include <iostream>
#include <set>
#include <vector>

using namespace std;

class Delegate{
    public:
    string name;
    string school;
    string phone; 
    Delegate(string p_name , string p_school, string p_phone){
        name = p_name; 
        school = p_school; 
        phone = p_phone; 
    }
};

class Team {
    public: 
    set<Delegate> members; 
    string school; 
    string name; 
    Team(string p_school ,string p_name, set<Delegate> p_members){
        members = p_members; 
        school = p_school; 
        name = p_name;
    }
};

// these types of algorithmic problems are really hard. IOI Training is very hard and competitive
// something like this could easily mess up any one of taiwan's candidates

signed main(void){
    return 0;
}