module.exports = {
    answere:[
        `#include <bits/stdc++.h>
        using namespace std;
        
        int simpleArraySum(vector<int> ar) {
            int total = 0;
            for (int item : ar) {
                total += item;
            }
            return total;
        }
        
        int main() {
            int n; cin>>n;
            vector<int>arr(n);
            for(int i=0;i<n;i++){
                cin>>arr[i];
            }
            cout <<simpleArraySum(arr);
            return 0;
        }
        `
    ]
}