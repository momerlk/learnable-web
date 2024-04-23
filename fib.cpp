#include <iostream>
#include <vector> 

#define ll long long 

using namespace std;  

vector<ll> memo = {0,1,1}; 
vector<vector<ll>> sums = {{0} , {1} , {0,1}}; 

ll fib(ll n){
    if (memo.size() > n) return memo[n];

    ll n1 = fib(n-2);
    ll n2 = fib(n-1);
    ll res = n1 + n2;

    memo.push_back(res);
    sums.push_back({n1,n2});

    return res;
}

int main(void){
    int n; cin >> n;
    if (n == 3){
        cout << "1 1 1\n";
        return 0;
    }
    else if (n == 2){
        cout << "1 1 0\n";
        return 0;
    }
    else if (n == 1){
        cout << "1 0 0\n";
        return 0;
    } else if (n == 0){
        cout << "0 0 0\n";
        return 0;
    }

    int num = n;
    for(int i = 0;i < n;i++){
        if (fib(i) == num){
            n = i;
            break;
        }

    }

    if(n > 3){
        int a , b , c;
        if (fib(n-1) >= (fib(n)/2)) a = fib(n-2);
        else a = fib(n-1);

        b = fib(n-2);
        c = fib(n-3);

        cout << a << " " << b << " " << c << endl;

        return 0;
    }
}